package com.mobi.lab.demo.service.gallery

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.mobi.lab.demo.model.GalleryParameters
import com.mobi.lab.demo.model.GalleryResponseDto
import com.mobi.lab.demo.service.util.RestService
import com.mobi.lab.demo.service.util.RestServiceURI
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.ui.ModelMap

@Service
class GalleryService @Autowired constructor(val restService: RestService) {
    @Value("\${imgur.clientID}")
    private val clientID: String? = null

    fun getGallery(galleryParams: GalleryParameters): GalleryResponseDto {
        val headerParam = HashMap<String, String>()
        headerParam["Authorization"] = "Client-ID $clientID"
        return restService.getActionWithParameters<GalleryResponseDto>(RestServiceURI.ImgurGallery.uri, GalleryResponseDto::class.java, galleryParams.getQueryParameters(), headerParam, galleryParams.getPathVariables())
    }
}
