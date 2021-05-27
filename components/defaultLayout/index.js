import Header from '../header'

const DefaultLayout = (props) => {
  console.log('props', props)
    return(
     <div>
       <Header />
       {props.children}
     </div>
    )
}

export default DefaultLayout;