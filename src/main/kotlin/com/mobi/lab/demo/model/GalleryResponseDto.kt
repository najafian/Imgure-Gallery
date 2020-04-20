package com.mobi.lab.demo.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable

data class GalleryResponseDto(
    @JsonProperty("data") val data: List<Any>,
    @JsonProperty("success") val success: Boolean,
    @JsonProperty("status") val status: Int) : Serializable
