package com.ncc9project.technolearn.Controller;

import com.ncc9project.technolearn.Model.Usuario;
import com.ncc9project.technolearn.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class APIUsers {

    @Autowired UsuarioService usuarioService;

    @GetMapping("/todos")
    public Iterable<Usuario> getAllUser() {return usuarioService.getAlluser();}

    @GetMapping("/buscar/{id}")
    public Optional<Usuario> getUserById(@PathVariable("id") long id) {
        return usuarioService.getUserById(id);
    }

}
