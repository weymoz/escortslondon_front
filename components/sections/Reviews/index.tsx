import React, { useState } from "react";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import Modal from "@simple/Modal";
import Title from "@simple/Title";
import Button from "@simple/Button";
import ReviewsInnerModal from "@simple/ReviewsInnerModal";
import ReviewAddModal from "@simple/ReviewAddModal";
import VerificationModal from "@simple/VerificationModal";
import SuccessModal from "@simple/SuccessModal";
import ReviewCard from "@simple/ReviewCard";
import Star from "@svg/star.svg";
import { Review } from "@typedefs/app";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectReviews } from "@store/profile";

interface Props {
  profile: any;
}

const Reviews = ({ profile = {} }: Props) => {
  const [reviewsModal, setReviewsModal] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });

  const reviews = useSelector<RootState, Review[]>(selectReviews);

  const listLimit = isTablet ? 2 : 3;
  const showMoreLimit = isDesktop ? 4 : 3;

  const handleReviwesModal = () => {
    setReviewsModal(!reviewsModal);
  };

  const handleAddReview = () => {
    setAddReviewModal(!addReviewModal);
  };

  const handleVerification = () => {
    setVerificationModal(!verificationModal);
  };

  const handleSuccess = () => {
    setAddReviewModal(false);
    setSuccessModal(!successModal);
  };

  return (
    <section className={s.root}>
      <Modal
        isOpen={addReviewModal}
        onRequestClose={handleAddReview}
        theme="dark"
      >
        <ReviewAddModal
          handleVerification={handleVerification}
          onClose={handleAddReview}
        />
      </Modal>
      <Modal isOpen={reviewsModal} onRequestClose={handleReviwesModal}>
        <ReviewsInnerModal
          profile={profile}
          reviews={reviews}
          handleAddReview={handleAddReview}
          onRequestClose={handleReviwesModal}
        />
      </Modal>
      <Modal
        isOpen={verificationModal}
        onRequestClose={handleVerification}
        mobileTheme="center"
      >
        <VerificationModal
          handleSuccess={handleSuccess}
          onRequestClose={handleVerification}
        />
      </Modal>
      <Modal
        isOpen={successModal}
        onRequestClose={handleSuccess}
        hideClose
        mobileTheme="center"
      >
        <SuccessModal onRequestClose={handleSuccess} />
      </Modal>

      <div className={s.container}>
        <div className={s.topBox}>
          <div className={s.titleWrapper}>
            <Title
              size="h6"
              after={`Show all (${reviews.length})`}
              onClick={handleReviwesModal}
            >
              Recent reviews
            </Title>
          </div>
          {!isMobile && (
            <div className={s.buttonWrapper} onClick={handleAddReview}>
              <Button size="sm" theme="outline">
                Submit review
                <Star />
              </Button>
            </div>
          )}
        </div>
        {reviews && reviews.length > 0 && (
          <div className={s.list}>
            {reviews.slice(0, listLimit).map((review) => (
              <ReviewCard review={review} className="row" />
            ))}
          </div>
        )}
        {isMobile && (
          <div className={s.buttonWrapperMobile} onClick={handleAddReview}>
            <Button size="sm" theme="outline">
              Submit review
              <Star />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
