import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  rating;
  docId;
  preUpdateMovie;
  snapShotData;
  snapShotReviewData;
  hasReviewShotSub;
  checkReviewSub;
  preUpdateReview;
  alreadyReviewed: boolean;
  displayEmptyCheckBox: boolean;
  didRate: boolean;
  movieTitle: boolean;
  reviewExists = [];
  ratedComparison = [];
  comparisonTitle = [];
  getUserVar = [];
  userRating: Observable<number>;
  users: Observable<any>;
  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    public db: AngularFirestore,
  ) {
    this.usersRef = this.db.collection<User>('users');
    this.users = this.usersRef.snapshotChanges();
  }

  getUser = async (): Promise<any> => {
      this.getUserVar = [];
      return await this.db.collection('users').get().toPromise().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.getUserVar.push({id: doc.id, data: doc.data()}); 
        });
      });
  };

  updateInterestedMovie = async (movieData) => {
    await this.db
      .collection('users')
      .doc(this.docId)
      .update({
        interested: firebase.firestore.FieldValue.arrayUnion(movieData[0]),
      });
  };

  deleteInterestedMovie = async (movieData) => {
    await this.db.collection('users').doc(this.docId).update({interested: firebase.firestore.FieldValue.arrayRemove(movieData.movie)});
  };

  checkTitle = async (movieId, userId) => {
    if (this.getUserVar.length !== 0) {
      await this.getUser();
    }
    try {
      this.getUserVar.forEach(user => {
        if (user.id === userId) {
          try {
            if (user.data.interested === undefined) return;
            user.data.interested.forEach(movie => {
              if (movie.id === movieId) {
                this.comparisonTitle.push(movie.title);
              }
            });
          } finally {
            if (user.data.rated === undefined) return
            user.data.rated.forEach(movie => {
              if (movie.id === movieId) {
                this.preUpdateMovie = {movie};
                this.ratedComparison.push(movie.title);
                this.userRating = of(movie.userRating);
              } else {
                return
              }
            })
          }
        };
      });
    } finally {
      if (this.comparisonTitle.length !== 0) {
        this.movieTitle = true;
        this.comparisonTitle = [];
      } else {
        this.movieTitle = false;
        this.comparisonTitle = [];
      };
      if (this.ratedComparison.length !== 0) {
        this.didRate = true;
        this.displayEmptyCheckBox = false;
        this.ratedComparison = [];
      } else {
        this.didRate = false;
        this.displayEmptyCheckBox = true;
        this.userRating = of(undefined);
        this.ratedComparison = [];
      };
    }
  };

  checkRatingExisting = async (movieTitle, userId) => {
    await this.getUserVar
    this.getUser().then(() => {
      try {
        this.getUserVar.forEach(user => {
         if (user.id === userId) {
           user.data.rated.forEach(movie => {
             if (movie.title === movieTitle) {
                this.preUpdateMovie = {movie};
                this.ratedComparison.push(movieTitle);
                this.userRating = of(movie.userRating);
              }
            });
          }
        });
      } finally {
        if (this.ratedComparison.length !== 0) {
          this.didRate = true;
          this.ratedComparison = [];
        } else {
          this.didRate = false;
          this.userRating = of(undefined);
          this.ratedComparison = [];
        };
      }
    })
  }

  checkReviewExisting = async (movieTitle, userId) => {
    await this.getUserVar;
    try {
      this.getUserVar.forEach(user => {
        if (user.id === userId) {
          if (user.data.reviews === undefined) return;
          user.data.reviews.forEach(review => {
            if (review.movieTitle === movieTitle) {
              this.reviewExists.push({
                movieTitle: review.movieTitle,
                review: review.review,
                reviewRating: review.reviewRating,
                dateCreated: review.dateCreated,
                poster_path: review.poster_path
              });
              this.preUpdateReview = {review};
              this.alreadyReviewed = true;
            } else {
              this.alreadyReviewed = false;
            }
          })
        }
      })
    } finally {
      return
    }
  }

  updateRatedList = async (movieData) => {
    if (this.preUpdateMovie !== undefined) {
      await this.db.collection('users').doc(this.docId).update({
        rated: firebase.firestore.FieldValue.arrayRemove(this.preUpdateMovie.movie)
      });
    }
    await this.db
      .collection('users')
      .doc(this.docId)
      .update({
        rated: firebase.firestore.FieldValue.arrayUnion(movieData[0]),
      });
  };

  deleteRatedMovie = async (movieData) => {
    await this.db.collection('users').doc(this.docId).update({rated: firebase.firestore.FieldValue.arrayRemove(movieData.movie)});
  };

  saveReview = async (reviewData) => {
    if (this.preUpdateReview !== undefined) {
      this.db.collection('users').doc(this.docId).update({
        reviews: firebase.firestore.FieldValue.arrayRemove(this.preUpdateReview.review)
      });
    };
    this.db.collection('users').doc(this.docId).update({reviews: firebase.firestore.FieldValue.arrayUnion(reviewData[0])})
  }

  hasReview = async (movieId, userId) => {
    this.hasReviewShotSub = this.db.collection('users').doc(this.docId).snapshotChanges().subscribe(res => {
      try {
        this.snapShotData = res.payload.data();
      } finally {
        if (this.snapShotData.uid === userId) {
          if (this.snapShotData.reviews === undefined) return;
          this.snapShotData.reviews.forEach(review => {
            if (review.id === movieId) {
              this.alreadyReviewed = true;
              if (this.reviewExists.length !== 0) {
                this.reviewExists = [];
              };
              this.reviewExists.push({
                movieTitle: review.movieTitle,
                review: review.review,
                reviewRating: review.reviewRating,
                dateCreated: review.dateCreated,
                poster_path: review.poster_path
              });
            } else {
              this.alreadyReviewed = false;
            }
          })
        }
      }
    })
  }
}
