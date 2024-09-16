'use strict';

const generatePdfBtn = document.getElementById('submit');
const logoChecked = document.getElementById('logo-check');

generatePdfBtn.addEventListener('click', async function() {
    const doc = new jsPDF();

    // mangal font for Hindi
    const fontMangal = await fetch('./fontMangal.txt');
    doc.addFileToVFS("Mangal-Regular.ttf", await fontMangal.text());
    doc.addFont("Mangal-Regular.ttf", "Mangal", "normal");


    // const title = "SONGS OF PRAISE AND WORSHIP (M.Y.F)";
    // const lyricstxt = await fetch("./lyrics.txt");
    // const lyrics = await lyricstxt.text();
    const title = document.getElementById('titleInput').value;
    const lyrics = document.getElementById('lyricsInput').value;
   
    if (logoChecked.checked) {
        console.log("CHECKED LOGO");
        await imgToBase64();
        doc.addImage(base64str, 'PNG', 5, 8, 20, 20);
    }

    // Set title
    doc.setFontSize(22);
    doc.text(title, 105, 20, null, null, 'center');

    // Set up lyrics
    doc.setFontSize(12);
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 2;

    const splitLyrics = doc.splitTextToSize(lyrics);
    let yOffset = 40;
    let column = 1;

    // Rectangle border
    doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40);

    splitLyrics.forEach((line, index) => {
        // Dynamically switch font based on language
        if (/[\u0900-\u097F]/.test(line)) {
            doc.setFont("Mangal");
        } 

        // Check if yOffset exceeds page height and create a new page or column
        if (yOffset + 5 > pageHeight - 10) {
            if (column === 1) {
                column = 2;
                yOffset = 40;
            } else {
                doc.addPage();
                column = 1;
                yOffset = 40;
                doc.rect(margin, 30, pageWidth - 2 * margin, pageHeight - 40, 'S');
            }
        }

        // Set xOffset for column positioning
        const xOffset = column === 1 ? margin + 5 : pageWidth / 2 + 5;

        // Put text into columns
        doc.text(line, xOffset, yOffset);
        yOffset += 5;

        // Draw vertical line between columns
        if (column === 2) {
            doc.line(pageWidth / 2, 30, pageWidth / 2, pageHeight - margin);
        }
    });

    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
});

let base64str = '';
async function imgToBase64() {
    const base64 = await fetch('./base64.txt');
    base64str = await base64.text();
}



