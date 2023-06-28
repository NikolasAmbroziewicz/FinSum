const mockData = [
  {
    id:1,
    title: 'Holiday',

    currency: 'USD',
  },
  {
    id:1,
    title: 'Investment',
    currency: 'USD',
  },
]

const AccountsList = () => {
  return (
    <div className="flex gap-6 mt-4">
      {
        mockData.map((el) => (
          <div className="flex flex-col justify-between w-[200px] h-[200px] border-slate-300 border-[1px] p-4 rounded-md bg-gray-100">
            <h2 className="mb-2">Title: {el.title}</h2>
            <span></span>
            <span>Currency: {el.currency}</span>
          </div>
        ))
      }
    </div>
  )
}

export default AccountsList