import {Link} from 'react-router-dom'

const Tasks = () => {
  return (
    <div>
      We Provide the following services:
      <br />
      1-................
      <br />
      2-............................
      <br />
      3-...........................................
      <hr />
      <div className='w-full flex justify-center align-middle mt-5'>
      <Link to="/signup">
                <button
                  type="button"
                  className=" bg-blue-500 text-white p-2 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
                  
                  >
                  Let&apos;s Do Tasks 
                </button>
              </Link>
      </div>
    </div>
  )
}

export default Tasks
