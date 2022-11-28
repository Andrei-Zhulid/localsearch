import ContactType from '../../../common/enums/ContactType';
import IOpeningHours from '../../../common/IOpeningHours';

interface IApiResponse {
  local_entry_id: string;
  displayed_what: string;
  displayed_where: string;
  addresses: {
    contacts: {
      contact_type: ContactType;
      call_link?: string;
      url?: string;
    }[];
  }[],
  opening_hours: {
    days: IOpeningHours
  };
}

export default IApiResponse;