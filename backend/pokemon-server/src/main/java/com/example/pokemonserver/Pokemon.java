
package com.example.pokemonserver;

import lombok.Data;

import java.util.List;

@Data
public class Pokemon {
    private String name_ko;
    private String info;
    private String description;
    private String color;
    private String img;
    private List<String> type;
    private double height;
    private double weight;
    private int id;
}
