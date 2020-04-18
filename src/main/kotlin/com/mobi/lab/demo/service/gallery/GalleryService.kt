package com.mobi.lab.demo.service.gallery

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.mobi.lab.demo.model.GalleryParameters
import com.mobi.lab.demo.service.util.RestService
import com.mobi.lab.demo.service.util.RestServiceURI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.ui.ModelMap

@Service
class GalleryService @Autowired constructor(val restService: RestService) {

    fun getGallery(galleryParams: GalleryParameters): ModelMap {
        val objectMapper = ObjectMapper();
        val params = objectMapper.convertValue(galleryParams, object : TypeReference<Map<String, String>>() {})
        return restService.getActionWithParameters<ModelMap>(RestServiceURI.ImgurGallery.uri, ModelMap::class.java, params)
    }
}
