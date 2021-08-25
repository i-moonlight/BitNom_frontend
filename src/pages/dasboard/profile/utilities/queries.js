// Profile Form GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_ADD_WORK = gql`
  mutation {
    Users {
      addWork(
        data: {
          company: "Amazon"
          title: "IOT Developer"
          start_date: "Mar 28, 2019"
          end_date: "Jan 6,2020"
          current: false
          description: "I worked as a software engineer here"
        }
      )
    }
  }
`;
// export const MUTATION_UPDATE_WORK = gql``;
// export const MUTATION_REMOVE_WORK = gql``;

export const MUTATION_ADD_EDUCATION = gql`
  mutation {
    Users {
      addEducation(
        data: {
          major: "Computer Science"
          institution: "Dedan Kimathi University"
          start_date: "Mar 20,2019"
          end_date: "April 23,2021"
          current: false
          description: "This is a computer course"
        }
      )
    }
  }
`;
// export const MUTATION_UPDATE_EDUCATION = gql``;
// export const MUTATION_REMOVE_EDUCATION = gql``;

export const MUTATION_ADD_HONOR = gql`
  mutation {
    Users {
      addHonor(
        data: {
          name: "French MasterClass"
          organization: "Alliance Francaise"
          start_date: "Feb 6,2018"
          end_date: "April 6,2018"
          expires: false
          url: "https://www.google.com"
        }
      )
    }
  }
`;
// export const MUTATION_UPDATE_HONOR = gql``;
// export const MUTATION_REMOVE_HONOR = gql``;

export const MUTATION_ADD_SKILL = gql`
  mutation {
    Users {
      addLanguage(data: { name: "Web Development" })
    }
  }
`;
// export const MUTATION_UPDATE_SKILL = gql``;
// export const MUTATION_REMOVE_SKILL = gql``;

export const MUTATION_ADD_COURSE = gql`
  mutation {
    Users {
      addCourse(data: { name: "Computer Science", year: "2022" })
    }
  }
`;
// export const MUTATION_UPDATE_COURSE = gql``;
// export const MUTATION_REMOVE_COURSE = gql``;

export const MUTATION_ADD_PROJECT = gql`
  mutation {
    Users {
      addProject(data: { name: "Computer Science", year: "2022" })
    }
  }
`;
// export const MUTATION_UPDATE_PROJECT = gql``;
// export const MUTATION_REMOVE_PROJECT = gql``;

export const MUTATION_ADD_LANGUAGE = gql`
  mutation {
    Users {
      addLanguage(data: { name: "English" })
    }
  }
`;
// export const MUTATION_UPDATE_LANGUAGE = gql``;
// export const MUTATION_REMOVE_LANGUAGE = gql``;

export const QUERY_FETCH_PROFILE = gql`
  query {
    Users {
      profile {
        _id
        displayName
        bio
        profile_pic
        displayName
        type
        reputation
        blocked
        portfolio
        website
        address
        location
        gender
        cover_pic
        loginType
        lastSeen
        paidUntil
        date
        bnTokens {
          walletAddress
          earned
          received
        }
        socials {
          social {
            _id
            name
            image
          }
          profile
        }
        email {
          address
          verified
        }
        work {
          _id
          company
          title
          start_date
          end_date
          current
          description
        }
        education {
          _id
          institution
          major
          start_date
          end_date
          current
          description
        }
        honors {
          _id
          organization
          name
          start_date
          end_date
          expires
          url
        }
        courses {
          _id
          name
          year
        }
        projects {
          _id
          name
          year
        }
        skills {
          _id
          name
        }
        languages {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_FETCH_PROFILE_BACKUP = gql`
  query {
    Users {
      profile {
        _id
        # referralCode
        displayName
        bio
        profile_pic
        displayName
        type
        reputation
        # reputationPoints
        # valuePointsCarry
        blocked
        portfolio
        website
        address
        location
        gender
        cover_pic
        loginType
        # profileReached
        # connections
        # searchAppeared
        # earnedTokens
        lastSeen
        paidUntil
        date
        # followers {
        #   userId
        # }
        # following {
        #   userId
        # }
        bnTokens {
          walletAddress
          earned
          received
        }
        socials {
          social {
            _id
            name
            image
          }
          profile
        }
        email {
          address
          verified
        }
        work {
          _id
          company
          title
          start_date
          end_date
          current
          description
        }
        education {
          _id
          institution
          major
          start_date
          end_date
          current
          description
        }
        honors {
          _id
          organization
          name
          start_date
          end_date
          expires
          url
        }
        courses {
          _id
          name
          year
        }
        projects {
          _id
          name
          year
        }
        skills {
          _id
          name
        }
        languages {
          _id
          name
        }
      }
    }
  }
`;
