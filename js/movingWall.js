/**
 * movingWall.js
 * 
 * Creates a dynamic effect where images move in a wall-like pattern in
 * Bootstrap 5. The KHK website uses this effect on the employers page to
 * create a visually engaging experience for users. The effect is achieved by
 * manipulating the position of images based on user interactions, such as
 * scrolling or mouse movement.
 * 
 * To use this script, paste the following HTML structure:
 * <div class="wall-container">
 *      <div class="wall-track">
 *          <!-- JavaScript will populate these with the moving wall images -->
 *          <!-- Add or remove wall tracks as desired -->
 *      </div>
 *      <div class="wall-track"></div>
 *      <div class="wall-track"></div>
 *      <div class="wall-track"></div>
 *  </div>
 *  <script src="movingWall.js"></script>
 * 
 * @author Richard Lamb
 * @version 1.0
 * @license MIT
 */

// The logo list itself now lives in data/employers.json (single source
// of truth, edited there instead of here) and is injected as
// window.KHK_EMPLOYERS by a small inline <script> on the page that
// includes the wall — see layouts/_default/members.html.
const wallImages = window.KHK_EMPLOYERS || [];

const wallTracks = document.querySelectorAll('.wall-track');

var counter = 0;

/**
 * getNext() is called by createWall() to get the next image to be displayed in
 * the track.
 * 
 * @param {number} trackIndex - The index of the track for which to get the next image
 * @return <img> element
 */
function getNext(trackIndex) {

  /* Calculate the index of the next image to be displayed */
  index = (counter * wallTracks.length + trackIndex) % wallImages.length;

  /* Create a new image element and set its src and alt attributes based on the index */
  const newElement = document.createElement('img');
  newElement.src = wallImages[index].src;
  newElement.alt = wallImages[index].alt;

  /* Increment the counter and return the new element */
  counter++;
  return newElement;
}

/**
 * createWall() is the main function.
 */
function createWall() {
  
  /* Loop through each track and populate it with images
     We need to create a seamless loop by duplicating the images */
  wallTracks.forEach((track, trackIndex) => {
    for (let i = 0; i < wallImages.length * 2; i++) {
      const newElement = getNext(trackIndex);
      track.appendChild(newElement);
    }
  });
}

createWall();
