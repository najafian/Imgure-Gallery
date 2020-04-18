package com.mobi.lab.demo.model


data class GalleryParameters(var sectionPathVar: String? = null,
                             var sortPathVar: String? = null,
                             var windowPathVar: String? = null,
                             var pagePathVar: Int? = null,
                             var showViralParam: Boolean? = null,
                             var showMatureParam: Boolean? = null,
                             var albumPreviewsParam: Boolean? = null
){
    constructor(builder: Builder) : this(builder.sectionPathVar, builder.sortPathVar, builder.windowPathVar, builder.pagePathVar, builder.showViralParam)

    class Builder {
        var sortPathVar: String? = null
            private set
        var windowPathVar: String? = null
            private set
        var sectionPathVar: String? = null
            private set
        var pagePathVar: Int? = null
            private set
        var showViralParam: Boolean? = null
            private set
        var showMatureParam: Boolean? = null
            private set
        var albumPreviewsParam: Boolean? = null
            private set

        fun sectionPathVar(sectionPathVar: String?) = apply { this.sectionPathVar = sectionPathVar }
        fun sortPathVar(sortPathVar: String?) = apply { this.sortPathVar = sortPathVar }
        fun windowPathVar(windowPathVar: String?) = apply { this.windowPathVar = windowPathVar }
        fun pagePathVar(pagePathVar: Int?) = apply { this.pagePathVar = pagePathVar }
        fun showViralParam(showViralParam: Boolean?) = apply { this.showViralParam = showViralParam }
        fun showMatureParam(showMatureParam: Boolean?) = apply { this.showMatureParam = showMatureParam }
        fun albumPreviewsParam(albumPreviewsParam: Boolean?) = apply { this.albumPreviewsParam = albumPreviewsParam }
        fun build() = GalleryParameters(this)
    }
}
