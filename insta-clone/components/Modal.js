import React, { useRef, Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);

  const uploadPost = async () => {
    if (loading) return true;

    setLoading(true);

    // 1. Create a post and add to Firestores' `post` collection
    // 2. GET PostID for newly created post
    // 3. Upload Image to Firebase Storage with that PostID
    // 4. GET Download URL from Firebase Storage and update Original Post with Image

    // 1.
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    // 2.
    console.log(`New doc added with ID ${docRef.id}`);

    // 3.
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      /* eslint-disable no-unused-vars */
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        // 4.
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };
  const addImageToPost = (event) => {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      {/* as React.Fragment */}
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex items-end justify-center 
        min-h-[800px] sm:min-h-screen 
        pt-4  px-4  pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duratio-200"
            leaveFrom="opactiy-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixes inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* Trick the browser into centering the modal*/}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opactiy-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                overflow-hidden shadow-xl transorm transition-all 
                sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12  rounded-full bg-red-100"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo...
                    </Dialog.Title>
                  </div>
                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>

                  <div>
                    <input
                      ref={captionRef}
                      type="text"
                      className="border-none focus:ring-0 w-full text-center"
                      placeholder="Please enter a caption..."
                    />
                  </div>
                </div>
                <div className="mt--5 sm:mt-6"></div>

                <button
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                              px-4 py-2 bg-red-600 texxt-base font-medium text-white hover:bg-red-700 focus:outline-none
                              focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed 
                              hover:disabled:bg-gray-300"
                  disabled={!selectedFile}
                  onClick={uploadPost}
                  type="button"
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
