package com.org.Triplens.Services.TrainServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.org.Triplens.DAO.TrainDao;
import com.org.Triplens.entity.Train;

@Service
public class TrainService {
	
	@Autowired
	TrainDao trainDao;

	public List<Train> getTrains(String origin, String destination) {
		return trainDao.getTrainsByOriginAndDestination(origin, destination);
	}
}
