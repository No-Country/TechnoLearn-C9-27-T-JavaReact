package com.ncc9project.technolearn.Service;

import com.ncc9project.technolearn.Model.Cursos;
import com.ncc9project.technolearn.Model.Usuario;
import com.ncc9project.technolearn.Repository.CursosRepository;
import com.ncc9project.technolearn.Repository.UsuarioRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final CursosRepository cursosRepository;

    @Autowired public UsuarioService(UsuarioRepository usuarioRepository,
                                     CursosRepository cursosRepository){
        this.usuarioRepository = usuarioRepository;
        this.cursosRepository = cursosRepository;
    }

    public Iterable<Usuario> getAlluser() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUserById(long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario saveUser(Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        return usuarioRepository.save(usuario);
    }

    public Usuario agregarCurso(Long userId, Long cursoId) {
        Set<Cursos> cursosSet = null;
        Usuario usuario = usuarioRepository.findById(userId).get();
        Cursos curso = cursosRepository.findById(cursoId).get();
        cursosSet = usuario.getCursosUsuario();
        cursosSet.add(curso);
        usuario.setCursosUsuario(cursosSet);
        return usuarioRepository.save(usuario);
    }
}