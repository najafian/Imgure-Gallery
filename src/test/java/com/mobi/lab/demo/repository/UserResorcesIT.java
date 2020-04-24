//package com.mobi.lab.demo.repository;
//
//import com.mobi.lab.demo.model.user.Users;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//
//import java.util.Optional;
//
//import static org.junit.Assert.assertEquals;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//public class UserRepositoryTest {
//
//    @Autowired
//    private UsersRepository repository;
//
//    @Test
//    public void testFindByUsername() {
//        Optional<Users> mehdi = repository.findByUsername("mehdi");
//        assertEquals("mehdi", mehdi.get().getUsername());
//    }
//
//    @Test
//    public void testFindById() {
//        Optional<Users> users = repository.findById(1);
//        assertEquals(true, users.isPresent());
//    }
//
//}
