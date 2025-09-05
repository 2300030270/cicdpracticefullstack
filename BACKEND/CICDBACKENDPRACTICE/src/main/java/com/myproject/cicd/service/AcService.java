package com.myproject.cicd.service;

import java.util.List;
import com.myproject.cicd.model.Ac;

public interface AcService 
{
public String addac(Ac a);
public String deleteac(int aid);
public List<Ac> viewallacs();
}
