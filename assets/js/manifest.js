/* ============================================================
   MANIFEST — THE ONLY FILE YOU EDIT, ROBBIE.

   THE EASY WAY (one video per chapter):

       p1: { video: "p1.mp4" }

   Render the chapter in Blender with the narration baked in,
   save it as media/p1/p1.mp4, and that's the whole job.
   No timing, no photo ordering, no transcript.

   Uncomment a line below as each chapter's video is ready.

   CAPITALS MATTER. "P1.mp4" and "p1.mp4" are different files
   to the live server. Type the name exactly as it appears in
   the folder. Stick to lowercase and you'll never think
   about it again.
   ============================================================ */

window.PORTFOLIO = {

  /* 00 — INTRO
     Currently the still-photo version, timed to your transcript.
     When the Blender render is ready, comment out the block
     below and use the one-liner instead:
         p0: { video: "p0.mp4" },                              */
  p0: {
    audio: "P0_AUDIO.mp3",
    media: [
      { src: "P0_01.png", hold: 2   },  // 0:00  "Good morning friends at ISAT"
      { src: "p0_02.png", hold: 3   },  // 0:02  "jump ahead or come along"
      { src: "p0_03.png", hold: 1   },  // 0:05  "Here we go."
      { src: "p0_04.png", hold: 3   },  // 0:06  "electrician by trade"
      { src: "p0_05.png", hold: 3   },  // 0:09  "total station nerd by obsession"
      { src: "p0_06.png", hold: 5   },  // 0:12  "builds websites now"
      { src: "p0_07.png", hold: 2   },  // 0:17  "from Ramona"
      { src: "p0_08.png", hold: 1.5 },  // 0:19
      { src: "p0_09.png", hold: 3   },  // 0:20  "robotic layout gear on hospitals"
      { src: "p0_10.png", hold: 1.5 },  // 0:23  "BIM on pharmaceutical labs"
      { src: "p0_11.mp4", hold: 6   }   // 0:25  "arguing with an AI about font choices"
    ]
  },

  /* 01 — THE EARLY YEARS */

   p1: { video: "p1.mp4" },

  /* 02 — THE TROUBLESOME ROOKIE */
  p2: {},
  // p2: { video: "p2.mp4" },

  /* 03 — THE HUNGRY APPRENTICE */
  p3: {},
  // p3: { video: "p3.mp4" },

  /* 04 — THE FIELD GRUNT */
  p4: {},
  // p4: { video: "p4.mp4" },

  /* 05 — THE OFFICE PROFESSIONAL */
  p5: {},
  // p5: { video: "p5.mp4" },

  /* 06 — THE DREAMER */
  p6: {}
  // p6: { video: "p6.mp4" },

};
