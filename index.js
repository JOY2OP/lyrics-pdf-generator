'use strict'
const generatePdfBtn = document.getElementById('submit');
const logoChecked = document.getElementById('logo-check')
generatePdfBtn.addEventListener('click', async function() {
    const doc = new jsPDF();

    const title = "CHRIST METHODIST CHURCH";
    const lyricstxt = await fetch("./lyrics.txt");
    const lyrics = await lyricstxt.text();

    // Set title
    doc.setFontSize(22);
    doc.text(title, 105, 20, null, null, 'center');

    // Set up lyrics
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 2;

    // Split lyrics text to fit in columns
    const splitLyrics = doc.splitTextToSize(lyrics, columnWidth);
    let yOffset = 40;
    const lineHeight = 5;
    let column = 1;

    // Draw border around the page content area
    doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40, 'S');

    splitLyrics.forEach((line, index) => {
        // Check if yOffset exceeds page height and create a new page or column
        if (yOffset + lineHeight > pageHeight - 10) {
            if (column === 1) {
                column = 2;
                yOffset = 40;
            } else {
                doc.addPage();
                column = 1;
                yOffset = 40;
                // Draw border on the new page
                doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40, 'S');
            }
        }

        // Set xOffset for column positioning
        const xOffset = column === 1 ? margin + 5 : pageWidth / 2 + 5;

        // Draw text in columns
        doc.text(line, xOffset, yOffset);
        yOffset += lineHeight;

        // Draw a vertical line in the middle if the lyrics are split into columns
        if (splitLyrics.length > 20 && column === 2 && index === Math.floor(splitLyrics.length / 2)) {
            doc.line(pageWidth / 2, 30, pageWidth / 2, pageHeight - 10);  // Vertical line
        }
    });

    // Open PDF in a new tab
    // const pdfOutput = doc.output('bloburl');
    // window.open(pdfOutput, '_blank');
    doc.save('lyrics.pdf')
});


// const generatePdfBtn = document.getElementById('submit');
// const logoChecked = document.getElementById('logo-check')

// // const lyrics = fetch
// generatePdfBtn.addEventListener('click', async function(){
//     const doc = new jsPDF();
//     console.log(doc)
//     // const title = document.getElementById('titleInput').value;
//     // const lyrics = document.getElementById('lyricsInput').value;
//     const title = "CHRIST METHODIST CHURCH"
//     const lyricstxt = await fetch("./lyrics.txt")
//     const lyrics = await lyricstxt.text()

//     const pageHeight = doc.internal.pageSize.height;
//     const pageWidth = doc.internal.pageSize.width;
//     console.log(pageHeight,pageWidth)

//     //Set rectangle
//     doc.rect(25,20,pageWidth, pageHeight);

//     //set title
//     doc.setFontSize(22);
//     doc.text(title, 105, 20, null, null, 'center');

//     //set lyrics
//     doc.setFontSize(10);
//     doc.text(lyrics, 30, 30, null, null, 'left' );
    
//     doc.splitTextToSize(lyrics, 210)


    

//     const pdfOutput = doc.output('bloburl');
//     window.open(pdfOutput, '_blank');

// });

// let base64str='';
// async function imgToBase64(){
//     const base64 = await fetch('./base64.txt') 
//     let base64text = await base64.text()
//     base64str=base64text;

//     // console.log(base64str);
// }
// imgToBase64();

