// Profile Form GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_ADD_WORK = gql`
    mutation ($data: IWork!) {
        Users {
            addWork(data: $data)
        }
    }
`;

export const MUTATION_UPDATE_WORK = gql`
    mutation ($id: String!, $data: IWork!) {
        Users {
            updateWork(_id: $id, data: $data)
        }
    }
`;

export const MUTATION_REMOVE_WORK = gql`
    mutation ($id: String!) {
        Users {
            removeWork(_id: $id)
        }
    }
`;

export const MUTATION_ADD_EDUCATION = gql`
    mutation ($data: IEducation!) {
        Users {
            addEducation(data: $data)
        }
    }
`;

export const MUTATION_UPDATE_EDUCATION = gql`
    mutation ($id: String!, $data: IEducation!) {
        Users {
            updateEducation(_id: $id, data: $data)
        }
    }
`;

export const MUTATION_REMOVE_EDUCATION = gql`
    mutation ($id: String!) {
        Users {
            removeEducation(_id: $id)
        }
    }
`;

export const MUTATION_ADD_HONOR = gql`
    mutation ($data: IHonors!) {
        Users {
            addHonor(data: $data)
        }
    }
`;

export const MUTATION_UPDATE_HONOR = gql`
    mutation ($id: String!, $data: IHonors!) {
        Users {
            updateHonor(_id: $id, data: $data)
        }
    }
`;

export const MUTATION_REMOVE_HONOR = gql`
    mutation ($id: String!) {
        Users {
            removeHonor(_id: $id)
        }
    }
`;

export const MUTATION_ADD_SKILL = gql`
    mutation ($data: ISkills!) {
        Users {
            addSkill(data: $data)
        }
    }
`;

export const MUTATION_REMOVE_SKILL = gql`
    mutation ($id: String!) {
        Users {
            removeSkill(_id: $id)
        }
    }
`;

export const MUTATION_ADD_COURSE = gql`
    mutation ($data: ICourses!) {
        Users {
            addCourse(data: $data)
        }
    }
`;

export const MUTATION_UPDATE_COURSE = gql`
    mutation ($id: String!, $data: ICourses!) {
        Users {
            updateCourse(_id: $id, data: $data)
        }
    }
`;

export const MUTATION_REMOVE_COURSE = gql`
    mutation ($id: String!) {
        Users {
            removeCourse(_id: $id)
        }
    }
`;

export const MUTATION_ADD_PROJECT = gql`
    mutation ($data: IProjects!) {
        Users {
            addProject(data: $data)
        }
    }
`;

export const MUTATION_UPDATE_PROJECT = gql`
    mutation ($id: String!, $data: IProjects!) {
        Users {
            updateProject(_id: $id, data: $data)
        }
    }
`;

export const MUTATION_REMOVE_PROJECT = gql`
    mutation ($id: String!) {
        Users {
            removeProject(_id: $id)
        }
    }
`;

export const MUTATION_ADD_LANGUAGE = gql`
    mutation ($data: ILanguages!) {
        Users {
            addLanguage(data: $data)
        }
    }
`;

export const MUTATION_REMOVE_LANGUAGE = gql`
    mutation ($id: String!) {
        Users {
            removeLanguage(_id: $id)
        }
    }
`;

const userSubFields = `
  _id
  # reputationPoints
  # valuePointsCarry
  # earnedTokens
  referralCode
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
  profileReached
  connections
  searchAppeared
  lastSeen
  paidUntil
  date
  followers {
    userId {
      _id
      profile_pic
      displayName
      reputation
      type
      bio
    }
  }
  following {
    userId {
      _id
      profile_pic
      displayName
      reputation
      type
      bio
    }
  }
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
`;

const emailField = `
email {
    address
    verified
}`;

export const MUTATION_UPDATE_PROFILE = gql`
    mutation ($data: IUpdateUser!) {
        Users {
            update(data: $data) {
                ${userSubFields}
            }
        }
    }
`;

export const QUERY_FETCH_PROFILE = gql`
  query {
    Users {
      profile {
        ${userSubFields + emailField}
      }
    }
  }
`;

export const QUERY_FETCH_PROFILE_BY_ID = gql`
  query ($id: String!) {
    Users {
      getById(_id: $id) {
        ${userSubFields}
      }
    }
  }
`;
