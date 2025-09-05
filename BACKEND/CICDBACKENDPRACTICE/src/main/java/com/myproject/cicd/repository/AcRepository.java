package com.myproject.cicd.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myproject.cicd.model.Ac;

@Repository
public interface AcRepository extends JpaRepository<Ac, Integer> {

}
