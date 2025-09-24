package com.myproject.cicd.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ac_table")
public class Ac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aid")
    private int id;

    @Column(name = "ac_brand", length = 50, nullable = false)
    private String brand;

    @Column(name = "ac_serial_no", length = 50, nullable = false, unique = true)
    private String serialNo;

    @Column(name = "ac_model", length = 50, nullable = false)
    private String model;

    // Constructors
    public Ac() {}

    public Ac(int id, String brand, String serialNo, String model) {
        this.id = id;
        this.brand = brand;
        this.serialNo = serialNo;
        this.model = model;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getSerialNo() { return serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
}
