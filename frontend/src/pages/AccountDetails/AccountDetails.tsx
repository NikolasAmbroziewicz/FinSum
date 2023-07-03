import { useParams } from "react-router-dom"

const AccountDetailsPage = () => {
  const params = useParams()

  return (
    <div>
      AccountsDetailsPage { params.accountId}
    </div>
  )
}

export default AccountDetailsPage