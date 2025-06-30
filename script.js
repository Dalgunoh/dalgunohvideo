fetch('videos.json')
  .then(response => response.json())
  .then(videos => {
    const container = document.getElementById('video-list');
    videos.forEach(video => {
      const div = document.createElement('div');
      div.className = 'video-container';
      div.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="${video.url}" allowfullscreen></iframe>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error cargando videos:', error);
  });
