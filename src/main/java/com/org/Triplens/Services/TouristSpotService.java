
package com.org.Triplens.Services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class TouristSpotService {

    private final String OSM_API = "https://nominatim.openstreetmap.org/search";
    private final String OPEN_METEO_API = "https://geocoding-api.open-meteo.com/v1/search";
    private final String WIKI_API = "https://en.wikipedia.org/w/api.php";
    private final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

    public List<Map<String, String>> getNearbySpots(String location) {
        RestTemplate restTemplate = new RestTemplate();
        List<Map<String, String>> candidates = new ArrayList<>();

        // 1. GET THE "GOLD LIST" (Now covers 30+ Cities)
        List<String> priorityKeywords = getCitySpecificKeywords(location);

        try {
            // 2. Get Coordinates
            double[] coords = getCoordinatesWithBackup(location, restTemplate);
            if (coords == null) {
                return createErrorList("Location Error", "Could not find coordinates.");
            }

            // 3. Fetch Data
            String wikiUrl = WIKI_API + "?action=query&generator=geosearch" +
                    "&ggscoord=" + coords[0] + "|" + coords[1] +
                    "&ggsradius=10000" +
                    "&ggslimit=50" +
                    "&prop=pageimages|extracts|info" +
                    "&pithumbsize=600" +
                    "&exintro=true" +
                    "&explaintext=true" +
                    "&exsentences=2" +
                    "&format=json";

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", USER_AGENT);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(wikiUrl, HttpMethod.GET, entity, String.class);
            JSONObject root = new JSONObject(response.getBody());

            if (root.has("query") && root.getJSONObject("query").has("pages")) {
                JSONObject pages = root.getJSONObject("query").getJSONObject("pages");
                Iterator<String> keys = pages.keys();

                while (keys.hasNext()) {
                    JSONObject page = pages.getJSONObject(keys.next());
                    String title = page.optString("title");
                    String lowerTitle = title.toLowerCase();
                    String extract = page.optString("extract", "").toLowerCase();

                    if (lowerTitle.equalsIgnoreCase(location.toLowerCase()))
                        continue;

                    // --- HARD BLOCKERS ---
                    if (lowerTitle.contains("district") || lowerTitle.contains("division"))
                        continue;
                    if (lowerTitle.contains("constituency") || lowerTitle.contains("lok sabha"))
                        continue;
                    if (lowerTitle.contains("assembly") || lowerTitle.contains("vidhan sabha"))
                        continue;
                    if (lowerTitle.contains("municipal") || lowerTitle.contains("corporation"))
                        continue;
                    if (lowerTitle.contains("headquarters") || lowerTitle.contains("cantonment"))
                        continue;
                    if (lowerTitle.contains("school") || lowerTitle.contains("college"))
                        continue;
                    if (lowerTitle.contains("university") || lowerTitle.contains("institute"))
                        continue;
                    if (lowerTitle.contains("hospital") || lowerTitle.contains("court"))
                        continue;
                    if (lowerTitle.contains("station") || lowerTitle.contains("railway"))
                        continue;
                    if (lowerTitle.contains("metro") || lowerTitle.contains("airport"))
                        continue;
                    if (lowerTitle.contains("geography"))
                        continue;

                    if (extract.contains("is a taluka") || extract.contains("is a town"))
                        continue;
                    if (extract.contains("census town") || extract.contains("administrative"))
                        continue;

                    // --- SCORING SYSTEM ---
                    int score = page.optInt("length", 0);

                    // 1. GOLD LIST BOOST (10 Million Points)
                    for (String keyword : priorityKeywords) {
                        if (lowerTitle.contains(keyword)) {
                            score += 10000000;
                            break;
                        }
                    }

                    // 2. Image Bonus
                    if (page.has("thumbnail"))
                        score += 50000;

                    // 3. Generic Boosts
                    if (lowerTitle.contains("fort"))
                        score += 200000;
                    if (lowerTitle.contains("temple") || lowerTitle.contains("mandir"))
                        score += 200000;
                    if (lowerTitle.contains("museum"))
                        score += 150000;
                    if (lowerTitle.contains("palace"))
                        score += 150000;
                    if (lowerTitle.contains("garden") || lowerTitle.contains("park"))
                        score += 100000;
                    if (lowerTitle.contains("market"))
                        score += 100000;
                    if (lowerTitle.contains("lake"))
                        score += 100000;

                    Map<String, String> map = new HashMap<>();
                    map.put("name", title);
                    map.put("description", page.optString("extract", "A famous tourist destination."));
                    map.put("distance_km", "In " + location);
                    map.put("type", "Top Attraction");

                    if (page.has("thumbnail")) {
                        map.put("image_url", page.getJSONObject("thumbnail").optString("source"));
                    } else {
                        map.put("image_url", "https://via.placeholder.com/400x300?text=No+Image");
                    }
                    map.put("score", String.valueOf(score));
                    candidates.add(map);
                }
            }

            candidates.sort((a, b) -> Integer.parseInt(b.get("score")) - Integer.parseInt(a.get("score")));

            List<Map<String, String>> finalResult = new ArrayList<>();
            for (Map<String, String> candidate : candidates) {
                if (finalResult.size() >= 5)
                    break;

                String newName = candidate.get("name").toLowerCase();
                boolean isDuplicate = false;

                for (Map<String, String> existing : finalResult) {
                    String existingName = existing.get("name").toLowerCase();
                    if (newName.contains(existingName) || existingName.contains(newName)) {
                        isDuplicate = true;
                        break;
                    }
                }

                if (!isDuplicate) {
                    candidate.remove("score");
                    finalResult.add(candidate);
                }
            }

            return finalResult.isEmpty() ? createErrorList("No Data", "Wiki returned no results.") : finalResult;

        } catch (Exception e) {
            e.printStackTrace();
            return createErrorList("Error", e.getMessage());
        }
    }

    // --- TOP 30 CITIES DATASET ---
    private List<String> getCitySpecificKeywords(String city) {
        String c = city.toLowerCase().trim();
        List<String> keywords = new ArrayList<>();

        if (c.contains("agra")) {
            keywords.addAll(Arrays.asList("taj mahal", "agra fort", "mehtab bagh", "tomb of itimad-ud-daulah"));
        } else if (c.contains("jaipur")) {
            keywords.addAll(Arrays.asList("hawa mahal", "amber fort", "city palace", "jantar mantar", "jal mahal",
                    "nahargarh"));
        } else if (c.contains("delhi") || c.contains("new delhi")) {
            keywords.addAll(Arrays.asList("india gate", "red fort", "qutub minar", "humayun", "lotus temple",
                    "akshardham", "jama masjid"));
        } else if (c.contains("mumbai")) {
            keywords.addAll(
                    Arrays.asList("gateway of india", "marine drive", "elephanta", "juhu", "siddhivinayak", "colaba"));
        } else if (c.contains("kolkata") || c.contains("calcutta")) {
            keywords.addAll(Arrays.asList("victoria memorial", "howrah bridge", "dakshineswar", "indian museum",
                    "eden gardens", "kalighat"));
        } else if (c.contains("bangalore") || c.contains("bengaluru")) {
            keywords.addAll(Arrays.asList("lalbagh", "cubbon park", "bangalore palace", "iskcon", "bannerghatta"));
        } else if (c.contains("hyderabad")) {
            keywords.addAll(Arrays.asList("charminar", "golconda", "hussain sagar", "ramoji", "chowmahalla"));
        } else if (c.contains("chennai") || c.contains("madras")) {
            keywords.addAll(Arrays.asList("marina beach", "kapaleeshwarar", "fort st. george", "guindy", "san thome"));
        } else if (c.contains("ahmedabad")) {
            keywords.addAll(Arrays.asList("sabarmati", "kankaria", "adalaj", "sidi saiyyed"));
        } else if (c.contains("pune")) {
            keywords.addAll(Arrays.asList("shaniwar wada", "aga khan", "sinhagad", "dagadusheth", "pataleshwar"));
        } else if (c.contains("goa") || c.contains("panaji")) {
            keywords.addAll(Arrays.asList("basilica of bom jesus", "calangute", "baga", "fort aguada", "dudhsagar"));
        } else if (c.contains("varanasi") || c.contains("kashi")) {
            keywords.addAll(Arrays.asList("kashi vishwanath", "dashashwamedh", "sarnath", "assi ghat", "manikarnika"));
        } else if (c.contains("udaipur")) {
            keywords.addAll(
                    Arrays.asList("city palace", "lake pichola", "jag mandir", "saheliyon-ki-bari", "fateh sagar"));
        } else if (c.contains("amritsar")) {
            keywords.addAll(Arrays.asList("golden temple", "jallianwala bagh", "wagah", "durgiana"));
        } else if (c.contains("jodhpur")) {
            keywords.addAll(Arrays.asList("mehrangarh", "umaid bhawan", "jaswant thada", "mandore"));
        } else if (c.contains("kerala") || c.contains("kochi")) {
            keywords.addAll(Arrays.asList("fort kochi", "mattancherry", "chinese fishing nets", "marine drive"));
        } else if (c.contains("mysore") || c.contains("mysuru")) {
            keywords.addAll(Arrays.asList("mysore palace", "brindavan", "chamundi", "st. philomena"));
        } else if (c.contains("rishikesh")) {
            keywords.addAll(Arrays.asList("laxman jhula", "ram jhula", "triveni ghat", "parmarth niketan"));
        } else if (c.contains("shimla")) {
            keywords.addAll(Arrays.asList("the ridge", "mall road", "jakhu", "christ church"));
        } else if (c.contains("manali")) {
            keywords.addAll(Arrays.asList("solang", "rohtang", "hidimba", "jogini"));
        } else if (c.contains("darjeeling")) {
            keywords.addAll(Arrays.asList("tiger hill", "batasia", "ghoom", "tea garden"));
        } else if (c.contains("ooty")) {
            keywords.addAll(Arrays.asList("botanical garden", "ooty lake", "doddabetta", "rose garden"));
        } else if (c.contains("nashik")) {
            keywords.addAll(Arrays.asList("trimbakeshwar", "pandavleni", "sula", "kalaram", "panchavati"));
        } else if (c.contains("visakhapatnam") || c.contains("vizag")) {
            keywords.addAll(Arrays.asList("rk beach", "submarine museum", "kailasagiri", "rushikonda"));
        } else if (c.contains("lucknow")) {
            keywords.addAll(Arrays.asList("bara imambara", "rumi darwaza", "hazratganj", "ambedkar park"));
        } else if (c.contains("bhubaneswar") || c.contains("puri")) {
            keywords.addAll(Arrays.asList("jagannath", "konark", "lingaraj", "udayagiri"));
        } else if (c.contains("indore")) {
            keywords.addAll(Arrays.asList("rajwada", "sarafa", "lal bagh palace", "khajrana"));
        } else if (c.contains("patna")) {
            keywords.addAll(Arrays.asList("golghar", "patna sahib", "buddha smriti", "patna museum"));
        } else if (c.contains("bhopal")) {
            keywords.addAll(Arrays.asList("upper lake", "van vihar", "sanchi", "bhimbetka"));
        } else if (c.contains("surat")) {
            keywords.addAll(Arrays.asList("dumas", "dutch garden", "sarthana"));
        }

        return keywords;
    }

    private double[] getCoordinatesWithBackup(String location, RestTemplate restTemplate) {
        double[] coords = getCoordsFromOSM(location, restTemplate);
        if (coords != null)
            return coords;
        return getCoordsFromOpenMeteo(location, restTemplate);
    }

    private double[] getCoordsFromOSM(String location, RestTemplate restTemplate) {
        try {
            String encodedLoc = URLEncoder.encode(location, StandardCharsets.UTF_8);
            String url = OSM_API + "?q=" + encodedLoc + "&format=json&limit=1";
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", USER_AGENT);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            JSONArray array = new JSONArray(response.getBody());
            if (array.length() > 0) {
                JSONObject obj = array.getJSONObject(0);
                return new double[] { obj.getDouble("lat"), obj.getDouble("lon") };
            }
        } catch (Exception e) {
        }
        return null;
    }

    private double[] getCoordsFromOpenMeteo(String location, RestTemplate restTemplate) {
        try {
            String encodedLoc = URLEncoder.encode(location, StandardCharsets.UTF_8);
            String url = OPEN_METEO_API + "?name=" + encodedLoc + "&count=1&language=en&format=json";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JSONObject root = new JSONObject(response.getBody());
            if (root.has("results")) {
                JSONObject obj = root.getJSONArray("results").getJSONObject(0);
                return new double[] { obj.getDouble("latitude"), obj.getDouble("longitude") };
            }
        } catch (Exception e) {
        }
        return null;
    }

    private List<Map<String, String>> createErrorList(String name, String desc) {
        List<Map<String, String>> list = new ArrayList<>();
        Map<String, String> map = new HashMap<>();
        map.put("name", name);
        map.put("description", desc);
        list.add(map);
        return list;
    }
}