import DiscussionCard from "./components/discussionCard"
import styles from "./styles.css"

const sample = {
  _id: {
    $oid: '607a412d28b0923318917ee8'
  },
  user: {
    code: '18maq7',
    email: 'faqdsdfeq@wwn.com',
    isActive: true,
    lastSeenAt: '1970-01-01T00:00:00.000Z',
    mobile: '211-677-1223',
    name: 'user4',
    passwordConfirm: '15649865df5asdf',
    photo: '/img/user-profiles/default.png',
    role: 'instructor',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc4ZDRiZGZjOTliODMwMDEwNTE3MmIiLCJpYXQiOjE2MTg2NzUxOTEsImV4cCI6MTYxODc2MTU5MX0.cEb8bK3Bv-hVkYWFURjkVASbKfAJ6a9dp2QBqPjmpbw',
    username: 'fasfdeee',
    _id: '6078d4bdfc99b8300105172b'
  },
  course: {
    $oid: '60324dcaba57d11e78c0dd68'
  },
  data: 'welcome to this course',
  comments: [
    {
      _id: '60324dcaba57d11e78c0dd68',
      data: 'i am a comment',
      user: {
        code: '18maq7',
        email: 'faqdsdfeq@wwn.com',
        isActive: true,
        lastSeenAt: '1970-01-01T00:00:00.000Z',
        mobile: '211-677-1223',
        name: 'user4',
        passwordConfirm: '15649865df5asdf',
        photo: '/img/user-profiles/default.png',
        role: 'instructor',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc4ZDRiZGZjOTliODMwMDEwNTE3MmIiLCJpYXQiOjE2MTg2NzUxOTEsImV4cCI6MTYxODc2MTU5MX0.cEb8bK3Bv-hVkYWFURjkVASbKfAJ6a9dp2QBqPjmpbw',
        username: 'fasfdeee',
        _id: '6078d4bdfc99b8300105172b'
      }
    },
    {
      _id: '60324dcaba57d11e78c0dd69',
      data: 'i am a comment',
      user: {
        code: '18maq7',
        email: 'faqdsdfeq@wwn.com',
        isActive: true,
        lastSeenAt: '1970-01-01T00:00:00.000Z',
        mobile: '211-677-1223',
        name: 'user4',
        passwordConfirm: '15649865df5asdf',
        photo: '/img/user-profiles/default.png',
        role: 'instructor',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc4ZDRiZGZjOTliODMwMDEwNTE3MmIiLCJpYXQiOjE2MTg2NzUxOTEsImV4cCI6MTYxODc2MTU5MX0.cEb8bK3Bv-hVkYWFURjkVASbKfAJ6a9dp2QBqPjmpbw',
        username: 'fasfdeee',
        _id: '6078d4bdfc99b8300105172b'
      }
    }
  ]
}


const DiscussionFeed= ()=>{
    return (
      <div>
        <DiscussionCard discussion={sample} styles={styles} />
        <DiscussionCard discussion={sample} styles={styles} />
        <DiscussionCard discussion={sample} styles={styles} />
      </div>
    )
}

export default DiscussionFeed