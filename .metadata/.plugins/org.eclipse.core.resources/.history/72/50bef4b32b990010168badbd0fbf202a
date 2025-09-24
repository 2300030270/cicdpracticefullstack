package com.myproject.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.cicd.model.Ac;
import com.myproject.cicd.repository.AcRepository;

@Service
public class AcServiceImpl implements AcService {

    @Autowired
    private AcRepository repo;

    @Override
    public String addac(Ac a) {
        repo.save(a);
        return "AC details added successfully!";
    }

    @Override
    public String deleteac(int aid) {
        if (repo.existsById(aid)) {
            repo.deleteById(aid);
            return "AC with ID " + aid + " deleted successfully!";
        } else {
            return "AC with ID " + aid + " not found!";
        }
    }

    @Override
    public List<Ac> viewallacs() {
        return repo.findAll();
    }

    @Override
    public Ac viewbyid(int id) {
        Optional<Ac> ac = repo.findById(id);
        return ac.orElse(null);
    }

    @Override
    public String updateac(int id, Ac a) {
        Optional<Ac> optionalAc = repo.findById(id);
        if (optionalAc.isPresent()) {
            Ac existing = optionalAc.get();
            existing.setBrand(a.getBrand());
            existing.setSerialNumber(a.getSerialNumber());
            existing.setPrice(a.getPrice());
            existing.setColor(a.getColor());
            repo.save(existing);
            return "AC with ID " + id + " updated successfully!";
        } else {
            return "AC with ID " + id + " not found!";
        }
    }
}
