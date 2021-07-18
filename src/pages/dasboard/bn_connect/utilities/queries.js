// B GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_CREATE_POST = gql`
  mutation ($data: ICreatePost!) {
    Posts {
      create(data: $data)
    }
  }
`;

export const MUTATION_LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    Users {
      login(username: $username, password: $password) {
        _id
        # referralCode
        displayName
        bio
        image
        email {
          address
          verified
        }
        displayName
      }
    }
  }
`;

export const MUTATION_GOOGLE_LOGIN = gql`
  mutation ($token: String!) {
    Users {
      googleLogin(token: $token) {
        _id
        displayName
        bio
        image
        email {
          address
          verified
        }
        displayName
      }
    }
  }
`;

export const MUTATION_GOOGLE_SIGNUP = gql`
  mutation ($token: String!) {
    Users {
      googleSignup(token: $token) {
        _id
        displayName
        bio
        image
        email {
          address
          verified
        }
        displayName
      }
    }
  }
`;

export const MUTATION_REQUEST_RESET = gql`
  mutation ($email: String!) {
    Users {
      createPasswordResetCode(email: $email)
    }
  }
`;

export const MUTATION_RESET_PASSWORD = gql`
  mutation ($resetCode: String!, $newPassword: String!) {
    Users {
      resetPassword(resetCode: $resetCode, newPassword: $newPassword)
    }
  }
`;

export const MUTATION_SEND_EMAIL_VERIFICATION = gql`
  mutation {
    Users {
      createEmailVerificationCode
    }
  }
`;

export const MUTATION_VERIFY_EMAIL = gql`
  mutation ($verificationCode: String!) {
    Users {
      verifyEmail(verificationCode: $verificationCode)
    }
  }
`;

export const MUTATION_UPDATE_PROFILE_INFO = gql`
  mutation ($displayName: String, $bio: String) {
    Users {
      update(data: { displayName: $displayName, bio: $bio }) {
        _id
        # referralCode
        displayName
        bio
        image
        email {
          address
          verified
        }
        displayName
      }
    }
  }
`;
