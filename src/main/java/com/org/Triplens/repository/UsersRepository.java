package com.org.Triplens.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.org.Triplens.entity.Users;

@Repository
public interface UsersRepository extends MongoRepository<Users, ObjectId> {

	List<Users> findByEmail(String email);
}
