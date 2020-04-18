package com.mobi.lab.demo.service

import com.mobi.lab.demo.service.gallery.GalleryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ImgurServicesImpl @Autowired constructor(
    override val galleryServices: GalleryService
) : ImgurServices
