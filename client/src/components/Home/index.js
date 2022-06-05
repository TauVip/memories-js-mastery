import { Container, Grid, Grow } from '@material-ui/core'
import Form from '../Form'
import Posts from '../Posts'
import useStyles from '../../styles'
import { useState } from 'react'

const Home = () => {
  const classes = useStyles()

  const [currentId, setCurrentId] = useState(0)

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
export default Home
