(function () {
  function qs (sel, root) {
    return (root || document).querySelector(sel)
  }
  function qsa (sel, root) {
    return Array.from((root || document).querySelectorAll(sel))
  }
  function isZenodoRecordUrl (href) {
    try {
      var u = new URL(href)
      return u.hostname === 'zenodo.org' &&
        /^\/records\/\d+\/?$/.test(u.pathname)
    } catch (e) {
      return false
    }
  }
  function recordIdFromUrl (href) {
    var m = href.match(/zenodo\.org\/records\/(\d+)/)
    return m ? m[1] : null
  }
  function buildViewerSrc (pdfUrl) {
    var base = '/pdfjs/reader.html'
    var q = '?file=' + encodeURI(pdfUrl)
    return base + q
  }
  // Prefer local static files first
  var LOCAL_PDF_MAP = {
    // Our Data, Our Rules (Zine)
    '15285154': '/files/OEDP_Zine 2_Data Co-Ownership_4.23.25.pdf',
    // Our Data, Our Values (Zine)
    '15285175': '/files/OEDP_Zine 3_Values_4.23.25.pdf',
    // The Data We Own (Zine)
    '15285148': '/files/OEDP_Zine 1_Data Sharing_4.23.25.pdf'
  }
  function findPdfFileLink (recordJson) {
    // Try RDM/legacy schemas
    var files = recordJson && (recordJson.files || (recordJson.metadata && recordJson.metadata.files) || [])
    if (Array.isArray(files) && files.length) {
      var pdf = files.find(function (f) {
        return f && ((f.mimetype && f.mimetype.indexOf('pdf') !== -1) ||
          (f.key && /\.pdf$/i.test(f.key)) || (f.filename && /\.pdf$/i.test(f.filename)))
      })
      if (pdf) {
        if (pdf.links && (pdf.links.download || pdf.links.self)) {
          return pdf.links.download || pdf.links.self
        }
        if (pdf.links && pdf.links.self) return pdf.links.self
        if (pdf.href) return pdf.href
      }
    }
    // Try top-level link under recordJson.links (e.g., bestmatch)
    if (recordJson && recordJson.links) {
      if (recordJson.links.pdf) return recordJson.links.pdf
      if (recordJson.links.self && /\.pdf($|\?)/i.test(recordJson.links.self)) return recordJson.links.self
      if (recordJson.links.download && /\.pdf($|\?)/i.test(recordJson.links.download)) return recordJson.links.download
    }
    return null
  }

  function createReaderButton (anchor) {
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'pdf-reader-button'
    btn.textContent = 'Open reader'
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      openInModal(anchor)
    })
    return btn
  }

  function showModal (src) {
    var modal = qs('#pdf-viewer-modal')
    var iframe = qs('#pdf-viewer-iframe', modal)
    var loading = qs('.pdf-viewer-loading', modal)

    loading.hidden = false
    iframe.removeAttribute('src')
    modal.setAttribute('aria-hidden', 'false')
    modal.classList.add('active')

    function onLoad () {
      loading.hidden = true
      iframe.removeEventListener('load', onLoad)
    }
    iframe.addEventListener('load', onLoad)
    iframe.src = src
    document.body.style.overflow = 'hidden'
  }

  function hideModal () {
    var modal = qs('#pdf-viewer-modal')
    var iframe = qs('#pdf-viewer-iframe', modal)
    modal.classList.remove('active')
    modal.setAttribute('aria-hidden', 'true')
    iframe.removeAttribute('src')
    document.body.style.overflow = ''
  }

  function wireModalClose () {
    var modal = qs('#pdf-viewer-modal')
    qsa('[data-pdf-close]', modal).forEach(function (el) {
      el.addEventListener('click', hideModal)
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideModal()
    })
  }

  async function openInModal (anchor) {
    try {
      var id = recordIdFromUrl(anchor.href)
      // Prefer local files
      if (id && LOCAL_PDF_MAP[id]) {
        showModal(buildViewerSrc(LOCAL_PDF_MAP[id]))
        return
      }
      // Fallback: try Zenodo API
      if (id) {
        var res = await fetch('https://zenodo.org/api/records/' + id)
        if (res.ok) {
          var json = await res.json()
          var pdfUrl = findPdfFileLink(json)
          if (pdfUrl) {
            showModal(buildViewerSrc(pdfUrl))
            return
          }
        }
      }
      // Final fallback
      window.open(anchor.href, '_blank')
    } catch (err) {
      console.error(err)
      window.open(anchor.href, '_blank')
    }
  }

  function enhanceZenodoLinks () {
    var content = qs('main.content') || document
    qsa('a.external-link', content).forEach(function (a) {
      if (!isZenodoRecordUrl(a.href)) return
      var btn = createReaderButton(a)
      a.insertAdjacentElement('afterend', btn)
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireModalClose()
    enhanceZenodoLinks()
  })
})()


