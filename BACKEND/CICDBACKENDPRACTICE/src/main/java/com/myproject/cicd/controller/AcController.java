package com.myproject.cicd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.myproject.cicd.model.Ac;
import com.myproject.cicd.service.AcService;

@RestController
@CrossOrigin("*")
public class AcController {

    @Autowired
    private AcService service;

    @GetMapping("/")
    public String home() {
        return "CI/CD FULLSTACK AC";
    }

    // View all ACs
    @GetMapping("/viewall")
    public List<Ac> viewallacs() {
        return service.viewallacs();
    }

    // View AC by ID
    @GetMapping("/view/{id}")
    public Ac viewById(@PathVariable int id) {
        return service.viewbyid(id);
    }

    // Add AC
    @PostMapping("/add")
    public String addac(@RequestBody Ac a) {
        return service.addac(a);
    }

    // Update AC by ID
    @PutMapping("/update/{id}")
    public String updateAc(@PathVariable int id, @RequestBody Ac a) {
        return service.updateac(id, a);
    }

    // Delete AC by ID
    @DeleteMapping("/delete/{aid}")
    public String deleteac(@PathVariable int aid) {
        return service.deleteac(aid);
    }
}
