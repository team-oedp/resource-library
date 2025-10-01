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
    // Community Data Playbook - English
    '15285124': '/files/OEDP_Playbook_English_4.23.25.pdf',
    // Community Data Playbook - Spanish  
    '15483728': '/files/OEDP_Playbook_Spanish_5.20.25.pdf',
    // Our Data, Our Rules (Zine)
    '15285154': '/files/OEDP_Zine 2_Data Co-Ownership_4.23.25.pdf',
    // Our Data, Our Values (Zine)
    '15285175': '/files/OEDP_Zine 3_Values_4.23.25.pdf',
    // The Data We Own (Zine)
    '15285148': '/files/OEDP_Zine 1_Data Sharing_4.23.25.pdf'
  }

  function createReaderButtonForId (recordId, customText) {
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'pdf-reader-button'
    btn.style.margin = '0'
    btn.textContent = customText || 'Open PDF Viewer'
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      openPdfById(recordId)
    })
    return btn
  }

  function showModal (src) {
    var modal = qs('#pdf-viewer-modal')
    var iframe = qs('#pdf-viewer-iframe', modal)
    var errorDiv = qs('#pdf-viewer-error', modal)

    if (!modal) {
      console.error('PDF viewer modal not found')
      return
    }
    if (!iframe) {
      console.error('PDF viewer iframe not found')
      return
    }
    if (!errorDiv) {
      console.error('PDF viewer error div not found')
      return
    }

    // Hide error and show iframe
    errorDiv.style.display = 'none'
    iframe.removeAttribute('src')
    modal.setAttribute('aria-hidden', 'false')
    modal.classList.add('active')

    iframe.src = src
    document.body.style.overflow = 'hidden'
  }

  function showErrorModal () {
    var modal = qs('#pdf-viewer-modal')
    var iframe = qs('#pdf-viewer-iframe', modal)
    var errorDiv = qs('#pdf-viewer-error', modal)

    if (!modal) {
      console.error('PDF viewer modal not found')
      return
    }
    if (!iframe) {
      console.error('PDF viewer iframe not found')
      return
    }
    if (!errorDiv) {
      console.error('PDF viewer error div not found')
      return
    }

    // Hide iframe and show error
    iframe.removeAttribute('src')
    errorDiv.style.display = 'flex'
    modal.setAttribute('aria-hidden', 'false')
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  function hideModal () {
    var modal = qs('#pdf-viewer-modal')
    var iframe = qs('#pdf-viewer-iframe', modal)
    var errorDiv = qs('#pdf-viewer-error', modal)
    modal.classList.remove('active')
    modal.setAttribute('aria-hidden', 'true')
    iframe.removeAttribute('src')
    if (errorDiv) {
      errorDiv.style.display = 'none'
    }
    document.body.style.overflow = ''
  }

  function wireModalClose () {
    var modal = qs('#pdf-viewer-modal')
    if (!modal) {
      console.error('PDF viewer: Modal not found when wiring close events')
      return
    }
    // Modal found, wiring close events
    qsa('[data-pdf-close]', modal).forEach(function (el) {
      el.addEventListener('click', hideModal)
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideModal()
    })
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'closePdf') {
        hideModal()
      }
    })
  }

  function openPdfById (recordId) {
    try {
      // Opening PDF by ID: recordId
      
      // Use local files when available
      if (recordId && LOCAL_PDF_MAP[recordId]) {
        // Using local file
        showModal(buildViewerSrc(LOCAL_PDF_MAP[recordId]))
        return
      }
      
      // If no local file mapping found, show error modal
      // No local file found, showing error modal
      showErrorModal()
    } catch (err) {
      console.error('PDF viewer error:', err)
      showErrorModal()
    }
  }

  function processManualPdfViewers () {
    var content = qs('main.content') || document
    // Processing manual PDF viewer elements
    
    // Process custom <pdf-viewer-button> elements
    var customButtons = qsa('pdf-viewer-button[data-zenodo-id]', content)
    // Found custom PDF viewer button elements
    
    customButtons.forEach(function (el) {
      var recordId = el.getAttribute('data-zenodo-id')
      var customText = el.textContent.trim() || el.getAttribute('data-text')
      
      if (recordId && LOCAL_PDF_MAP[recordId]) {
        // Creating custom button for record ID
        var btn = createReaderButtonForId(recordId, customText)
        el.parentNode.replaceChild(btn, el)
      } else if (recordId) {
        console.log('PDF viewer: Creating button that will show error modal for record ID:', recordId)
        var btn = createReaderButtonForId(recordId, customText)
        el.parentNode.replaceChild(btn, el)
      }
    })
    
    // Process elements with data-pdf-viewer attribute
    var dataPdfElements = qsa('[data-pdf-viewer]', content)
    // Found elements with data-pdf-viewer attribute
    
    dataPdfElements.forEach(function (el) {
      var recordId = el.getAttribute('data-pdf-viewer')
      var customText = el.getAttribute('data-pdf-text')
      
      if (recordId) {
        // Converting element to PDF viewer for record ID
        el.style.cursor = 'pointer'
        el.addEventListener('click', function (e) {
          e.preventDefault()
          openPdfById(recordId)
        })
        if (customText) {
          el.textContent = customText
        }
      }
    })
  }


  document.addEventListener('DOMContentLoaded', function () {
    wireModalClose()
    processManualPdfViewers()
  })
})()


