import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { FaFilePdf } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFDownload = () => {
  const handleDownloadPDF = async () => {
    try {
      // Get all chart containers
      const chartContainers = document.querySelectorAll('.analytics-section');
      
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yOffset = 10;
      
      // Process each chart container
      for (let i = 0; i < chartContainers.length; i++) {
        const container = chartContainers[i];
        const canvas = await html2canvas(container);
        const imgData = canvas.toDataURL('image/png');
        
        // Add new page if not the first chart
        if (i > 0) {
          pdf.addPage();
          yOffset = 10;
        }
        
        // Calculate dimensions to fit the page
        const imgWidth = 190; // A4 width - margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 10, yOffset, imgWidth, imgHeight);
      }
      
      // Save the PDF
      pdf.save('churn-analysis-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Download Analysis Report
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaFilePdf />}
            onClick={handleDownloadPDF}
            size="large"
          >
            Download PDF Report
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          Download a comprehensive PDF report containing all charts and analysis from this dashboard.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PDFDownload; 