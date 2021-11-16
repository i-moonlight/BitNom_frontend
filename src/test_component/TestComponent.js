// import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
// import SkeletonCreateScrollCard from '../pages/dasboard/bn_connect/skeleton/SkeletonCreateScrollCard';
import Scroll from '../pages/dasboard/bn_connect/scroll/Scroll';

// const Scroll = React.lazy(() =>
//     import('../pages/dasboard/bn_connect/scroll/Scroll')
// );

export default function TestComponent() {
    const state = useSelector((st) => st);
    const posts = state.posts.list;
    const user = state.auth.user;

    return (
        <>
            <div className="d-flex align-items-center flex-column py-5">
                <div className="w-50">
                    {posts.map((scroll) => (
                        // <Suspense
                        //     key={scroll?._id}
                        //     fallback={<SkeletonCreateScrollCard />}
                        //     >
                        <Scroll
                            key={scroll?._id}
                            profileData={user}
                            scroll={scroll}
                            // setOpen={() => setCreateScrollOpen(true)}
                            // setOpenShareModal={setOpenShareModal}
                            // setUpdateOpen={setUpdateScrollOpen}
                            // setUpdateCommentOpen={setUpdateCommentOpen}
                            // setOpenFlag={setCreateFlagOpen}
                            // setFlaggedResource={setFlaggedResource}
                            // setOpenReactions={setOpenReactions}
                            // setResourceReactions={setResourceReactions}
                            // setSharedResource={setSharedResource}
                            // setImageIndex={setImageIndex}
                            // setPostToPreview={setPostToPreview}
                            // setCommentToEdit={setCommentToEdit}
                            // setPostToEdit={setPostToEdit}
                            // setImagePreviewURL={(url) => {
                            //     setImagePreviewURL(url);
                            // }}
                            // setImagePreviewOpen={(open) => {
                            //     setImagePreviewOpen(open);
                            // }}
                            // setImageModalOpen={(open) => {
                            //     setImageModalOpen(open);
                            // }}
                        />
                        // </Suspense>
                    ))}
                </div>
            </div>
            {/* <TrainerCarousel /> */}
            {/* <MuiCarousel /> */}
        </>
    );
}
