<template>
<span>
  <div id="pageContainer" class="pdfViewer singlePageView"></div>
</span>
</template>
<script>
import pdfjsLib from 'pdfjs-dist/build/pdf'
// require('@/../static/pdfjs/pdf_viewer.js')
import { PDFPageView, DefaultTextLayerFactory, DefaultAnnotationLayerFactory } from 'pdfjs-dist/web/pdf_viewer'

export default {
  name: 'annotView',
  components: {
  },
  data() {
    return {
      loadAnnotData: '',
      pdfjs: {
        WORKER_SRC: '@/../static/pdfjs/pdf.worker.js',
        CMAP_URL: '@/../node_modules/pdfjs-dist/cmaps/',
        CMAP_PACKED: true,
        PAGE_TO_VIEW: 1,
        PAGE_COUNT: 1,
        SCALE: 1.0,
        URL: '',
        CONTAINER: null
      }
    }
  },
  props: {
    domId: {
      type: Array,
      default: []
    },
    url: {
      type: String,
      default: ''
    },
    preUrl: {
      type: String,
      default: ''
    },
    versionName: {
      type: String,
      default: ''
    },
    preVersionName: {
      type: String,
      default: ''
    },
    canAnnot: {
      type: Boolean,
      default: false
    },
    setData: { // 如果是clear代表清除批注视图
      type: String,
      default: ''
    },
    manager: {
      type: Object | null,
      default: null
    },
    differ: {
      type: Object | null,
      default: null
    }
  },
  computed: {

  },
  watch: {
    setData: function(xdata) {
      if (xdata === 'clear') {
        // 清除批注视图
        this.loadAnnot('')
      } else if (xdata) {
        // 展示批注视图
        this.loadAnnot(xdata)
      }
    },
    url: function(u) {
      if (!u) {
        return
      }
      this.loadView(u)
    },
    preUrl: function(u) {
      if (!u) {
        return
      }
      this.loadDiffView(u)
    }
  },
  created() {
  },
  mounted() {
    this.resetViewSize()
    try {
      // this.loadDiffView(this.url)
      this.loadView(this.url)
    } catch (error) {
      document.getElementById('pageContainer').innerText = error
    }
    
  },
  methods: {
    resetViewSize() {
      const theCanvas = document.getElementById('pageContainer')
      const w = document.body.clientWidth
      const h = document.body.clientHeight - 40
      theCanvas.style.height = `${h}px`
      theCanvas.style.width = `${w}px`
    },
    initPdfjs() {
      pdfjsLib.GlobalWorkerOptions.workerSrc = this.pdfjs.WORKER_SRC
    },
    loadView(url) {
      if (!url) {
        return
      }
      this.pdfjs.URL = url
      this.pdfjs.CONTAINER = document.getElementById('pageContainer');

      
    },
    renderPage({
      CONTAINER = null,
      PAGE_TO_VIEW = 1,
      SCALE = 1.0
    }) {
      const self = this
      // Loading document.
      pdfjsLib.getDocument({
        url: this.pdfjs.URL,
        cMapUrl: this.pdfjs.CMAP_URL,
        cMapPacked: this.pdfjs.CMAP_PACKED,
      }).then(function(pdfDocument) {
        // Document loaded, retrieving the page.
        return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
          // Creating the page view with default parameters.
          var pdfPageView = new PDFPageView({
            container: CONTAINER,
            id: PAGE_TO_VIEW,
            scale: SCALE,
            defaultViewport: pdfPage.getViewport(SCALE),
            // We can enable text/annotations layers, if needed
            textLayerFactory: new DefaultTextLayerFactory(),
            annotationLayerFactory: new DefaultAnnotationLayerFactory(),
          });
          // Associates the actual page with the view, and drawing it
          pdfPageView.setPdfPage(pdfPage);
          return pdfPageView.draw();
        });
      })
    },
    loadDiffView(url) {
    },
    loadAnnot(setData) {
    },
    onAnnotAdded(guid,AnnotType,Extend) {
      this.$emit('afterDrawAnnot', guid)
    },
  }
}
</script>
<style lang="less" scoped>
  #pageContainer {
    position: absolute;
    top: 40px;
    left: 0;
    overflow: auto;
  }



</style>
