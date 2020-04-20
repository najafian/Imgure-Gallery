package com.mobi.lab.demo.rest

import com.mobi.lab.demo.model.GalleryParameters
import com.mobi.lab.demo.model.GalleryResponseDto
import com.mobi.lab.demo.service.ImgurServices
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/imgur-gallery/")
class ImgurGalleryController @Autowired constructor(val imgurService: ImgurServices) {

    @GetMapping("{section}/{sort}/{window}/{page}")
    fun getGallery(@PathVariable("section") section: String,
                   @PathVariable("sort") sort: String,
                   @PathVariable("window") window: String,
                   @PathVariable("page") page: Int,
                   @RequestParam("showViral") showViral: Boolean?,
                   @RequestParam("mature") showMature: Boolean?,
                   @RequestParam("album_previews") albumPreviews: Boolean? = null): GalleryResponseDto {

        var galleryParameters = GalleryParameters
            .Builder()
            .sectionPathVar(section)
            .sortPathVar(sort)
            .windowPathVar(window)
            .pagePathVar(page)
            .showViralParam(showViral)
            .showMatureParam(showMature)
            .albumPreviewsParam(albumPreviews)
            .build()
        return imgurService.galleryServices.getGallery(galleryParameters)
    }


    @ExceptionHandler
    fun exception(e: Exception) {
        println(e.toString())
    }
}
