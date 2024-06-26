document.addEventListener('DOMContentLoaded', () => {
    const notesBox = document.querySelector('.notesBox');
    const createBtn = document.querySelector('.animated-button');
    const storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
        notesBox.innerHTML = storedNotes;
        addDeleteFunctionality();
    }

    function updateStorage() {
        localStorage.setItem("notes", notesBox.innerHTML);
    }

    function addDeleteFunctionality() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                btn.closest('.aNote').remove();
                updateStorage();
            });
        });
    }

    createBtn.addEventListener("click", () => {
        let this_aNote = document.createElement("div");
        let this_input_note = document.createElement("p");
        let this_other = document.createElement("div");
        let this_time_stamp = document.createElement("div");
        let this_image_box = document.createElement("div");
        let this_img = document.createElement("img");
        let this_created = document.createElement("span");
        let this_edited = document.createElement("span");

        this_aNote.className = "aNote";
        this_input_note.className = "input-note";
        this_other.className = "other";
        this_time_stamp.className = "time-stamp";
        this_image_box.className = "image-box";
        this_img.src = "delete.png";
        this_img.alt = "Delete";
        this_img.className = "delete-btn";
        this_created.className = "created";
        this_edited.className = "edited";

        this_input_note.setAttribute("contenteditable", "true");

        this_aNote.appendChild(this_input_note);
        this_aNote.appendChild(this_other);
        this_other.appendChild(this_time_stamp);
        this_other.appendChild(this_image_box);
        this_image_box.appendChild(this_img);

        let now = new Date();
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        this_created.innerHTML = `Created: ${now.toLocaleString('en-US', options)}`;
        this_edited.innerHTML = "Not yet Edited <br>";

        this_time_stamp.appendChild(this_edited);
        this_time_stamp.appendChild(this_created);

        notesBox.prepend(this_aNote);
        addDeleteFunctionality();
        updateStorage();

        this_aNote.addEventListener('input', () => {
            let editedNow = new Date();
            this_edited.innerHTML = `Last Edited: ${editedNow.toLocaleString('en-US', options)}<br>`;
            updateStorage();
        });
    });

    notesBox.addEventListener("input", updateStorage);

    function addNoteListeners() {
        const notes = document.querySelectorAll('.aNote');
        notes.forEach(note => {
            note.addEventListener('input', () => {
                let editedNow = new Date();
                let editedStamp = note.querySelector('.edited');
                editedStamp.innerHTML = `Last Edited: ${editedNow.toLocaleString('en-US', options)}<br>`;
                updateStorage();
            });
        });
    }

    addNoteListeners();
});
