package com.mobi.lab.demo.repository;


import com.mobi.lab.demo.DemoApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(classes = DemoApplication.class)
@ExtendWith({ MockitoExtension.class})
@AutoConfigureMockMvc
@WithMockUser
public class GalleryResourceIT {

    @Autowired
    private MockMvc restMockMvc;


    @Test
    @Transactional
    public void getAlbumList() throws Exception {
        // Get all the Items
        restMockMvc.perform(get("/api/imgur-gallery/top/top/week/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));
    }

}
