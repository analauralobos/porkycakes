package com.example.Producto;

import lombok.Data;

@Data
public class Producto {
    private Integer id_Producto;    
    private String Nombre_Producto;  
    private float precio_vta;
    private Integer cant_porciones;
    private String descripcion_producto;
    private Integer p_categoria;
    private byte[] imagen;    
}
