'use strict'

const generatePdfBtn = document.getElementById('submit');
const logoChecked = document.getElementById('logo-check')
generatePdfBtn.addEventListener('click', async function() {
    const doc = new jsPDF();

    // const title = "CHRIST METHODIST CHURCH";
    // const lyricstxt = await fetch("./lyrics.txt");
    // const lyrics = await lyricstxt.text();
    const title = document.getElementById('titleInput').value;
    const lyrics = document.getElementById('lyricsInput').value;

    // Set title
    doc.setFontSize(22);
    doc.text(title, 105, 20, null, null, 'center');

    // Set up lyrics
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 2;
    console.log('columnWidth:',columnWidth);

    // Split lyrics text to fit in columns
    const splitLyrics = doc.splitTextToSize(lyrics); //array of each line
    // console.log(splitLyrics);
    
    let yOffset = 40; //text starts on y-axis(y-margin-top)
    const lineHeight = 5;
    let column = 1;

    //rectangle border 
    doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40);

    splitLyrics.forEach((line, index) => {
        //Check if yOffset exceeds page height and create a new page or column
        if (yOffset + lineHeight > pageHeight - 10) {
            if (column === 1) {
                column = 2;
                yOffset = 40;
            } else {
                doc.addPage();
                column = 1;
                yOffset = 40;
                //draw border on new page
                doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40, 'S');
            }
        }

        //set xOffset for column positioning
        const xOffset = column === 1 ? margin + 5 : pageWidth / 2 + 5;

        //put text into columns
        doc.text(line, xOffset, yOffset);
        yOffset += lineHeight;

        //draw vertical line
        if (column === 2) { 
            doc.line(pageWidth/2, 30, pageWidth/2 , pageHeight-margin)
            
        }
    });

    // Open PDF in a new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank'); //'_blank' opens the url in new tab

    let saveFileDate = new Date().toLocaleString().replace(/ /g, '')
    doc.save(`lyrics-${saveFileDate}.pdf`)
});


// let base64str='';
// async function imgToBase64(){
//     const base64 = await fetch('./base64.txt') 
//     let base64text = await base64.text()
//     base64str=base64text;

//     // console.log(base64str);
// }
// imgToBase64();

