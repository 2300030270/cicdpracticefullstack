package com.myproject.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myproject.cicd.model.Ac;
import com.myproject.cicd.repository.AcRepository;

@Service
public class AcServiceImpl implements AcService
{

	@Autowired
   private AcRepository repository;
   
	@Override
	public String addac(Ac a) 
	{
		repository.save(a);
		return "Ac added successfully";
	}

	@Override
	public String deleteac(int aid)
	{
	Optional<Ac> object = repository.findById(aid);
	String msg = null;
		if(object.isPresent())
		{
			Ac ac = object.get();
			repository.delete(ac);
			msg = "Ac Deleted Successfully";
		}
		else
		{
			msg = "Ac Id Not Found To Delete";
		}
		return msg;
	}

	@Override
	public List<Ac> viewallacs() 
	{
				return repository.findAll();
	}
}
