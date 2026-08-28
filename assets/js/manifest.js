/* ============================================================
   MANIFEST — THIS IS THE ONLY FILE YOU NEED TO EDIT, ROBBIE.

   For each page, list the media files in the order you want
   them to appear. That's it. The order in this list IS the
   order on screen.

   Rules:
     - Files live in  media/p0/ , media/p1/ , media/p2/ ...
     - Just write the filename. Don't write the folder.
     - CAPITALS MATTER. "P0_01.png" and "p0_01.png" are two
       different files as far as the live server is concerned.
       Type the name exactly as it appears in the folder.
     - Images: .jpg .png .webp     Clips: .mp4
     - Audio: one file per page, named in "audio" below.

   "hold" is how many seconds that shot stays on screen.
   Anything without a "hold" splits the leftover time evenly.

   Leave a list empty ( [] ) and that page shows a friendly
   "nothing here yet" card instead of breaking.
   ============================================================ */

window.PORTFOLIO = {

  /* ---- INTRO — 31 seconds, timed to your transcript ----
     Each hold below matches where you marked the shot in
     P0_TRANSCRIPTION.txt. Nudge any number if a shot feels
     rushed; the rest will still land because the audio is
     the clock, not the images.                            */
  p0: {
    audio: "P0_AUDIO.mp3",
    media: [
      { src: "P0_01.png", hold: 2   },  // 0:00  "Good morning friends at ISAT and welcome."
      { src: "p0_02.png", hold: 3   },  // 0:02  "Feel free to jump ahead or come along for the full ride."
      { src: "p0_03.png", hold: 1   },  // 0:05  "Here we go."
      { src: "p0_04.png", hold: 3   },  // 0:06  "This is Robert Clarke, electrician by trade,"
      { src: "p0_05.png", hold: 3   },  // 0:09  "total station nerd by obsession"
      { src: "p0_06.png", hold: 5   },  // 0:12  "a guy who builds websites now" → "story of how a kid"
      { src: "p0_07.png", hold: 2   },  // 0:17  "from Ramona"
      { src: "p0_08.png", hold: 1.5 },  // 0:19
      { src: "p0_09.png", hold: 3   },  // 0:20  "robotic layout gear on hospitals"
      { src: "p0_10.png", hold: 1.5 },  // 0:23  "coordinating BIM on pharmaceutical labs"
      { src: "p0_11.mp4", hold: 6   }   // 0:25  "arguing with an AI about font choices" → "Let's rewind."
    ]
  },

  p1: {
    audio: "p1_audio.mp3",
    media: []
  },

  p2: {
    audio: "p2_audio.mp3",
    media: []
  },

  p3: {
    audio: "p3_audio.mp3",
    media: []
  },

  p4: {
    audio: "p4_audio.mp3",
    media: []
  },

  p5: {
    audio: "p5_audio.mp3",
    media: []
  },

  p6: {
    audio: "p6_audio.mp3",
    media: []
  }

};
