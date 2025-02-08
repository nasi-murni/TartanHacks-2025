if (response.ok) {
    const text = data.recommendation;
    // Split the text into sections and format them
    const formattedHtml = formatRecommendation(text);
    recommendation.innerHTML = formattedHtml;
    result.classList.remove('hidden');
}

// Add this new function to format the recommendation
function formatRecommendation(text) {
    // Split the text into lines
    const lines = text.split('\n').filter(line => line.trim());
    let html = '';
    let currentSection = '';

    lines.forEach(line => {
        // Check if this is a section header
        if (line.includes('Before Flight') || 
            line.includes('During Flight') || 
            line.includes('After Arrival')) {
            if (currentSection) {
                html += '</div>'; // Close previous section
            }
            currentSection = line;
            html += `<div class="section">
                      <div class="section-title">${line}</div>`;
        } else if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            // Format bullet points
            const bulletText = line.replace(/^[•-]\s*/, '').trim();
            html += `<div class="bullet-point">${bulletText}</div>`;
        } else {
            // Regular text
            html += `<div class="bullet-point">${line}</div>`;
        }
    });

    // Close the last section
    if (currentSection) {
        html += '</div>';
    }

    return html;
} 