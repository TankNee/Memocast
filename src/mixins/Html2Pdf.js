import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

function downloadPDF (ele, pdfName) {
  const eleW = ele.offsetWidth
  const eleH = ele.offsetHeight
  const eleOffsetTop = ele.offsetTop
  const eleOffsetLeft = ele.offsetLeft

  var canvas = document.createElement('canvas')
  var abs = 0

  const winIn = document.documentElement.clientWidth || document.body.clientWidth
  const winOut = window.innerWidth
  if (winOut > winIn) {
    abs = (winOut - winIn) / 2
  }
  canvas.width = eleW * 2
  canvas.height = eleH * 2

  var context = canvas.getContext('2d')
  context.scale(2, 2)
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
  html2canvas(ele, {
    dpi: 300,
    useCORS: true
  }).then((canvas) => {
    var contentWidth = canvas.width
    var contentHeight = canvas.height
    var pageHeight = contentWidth / 592.28 * 841.89
    var leftHeight = contentHeight
    var position = 0
    var imgWidth = 595.28
    var imgHeight = 595.28 / contentWidth * contentHeight
    var pageData = canvas.toDataURL('image/jpeg', 1.0)
    var pdf = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save(pdfName)
  })
}
export default {
  downloadPDF
}
