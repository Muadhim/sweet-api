interface ApiRequest {
  params: Item[];
  body: Body;
  headers: Item[];
}

interface ResponseData {
  id?: string;
  tab_name?: string;
  status_code?: number;
  name?: string;
  content_type?: string;
  data_schema?: string;
}

interface Item {
  name?: string;
  type?: string;
  example?: string;
  description?: string;
}

interface Body {
  form_data?: Item[];
  url_encoded?: Item[];
  json_data?: string;
  xml?: string;
}

interface ResponseTabPanel {
  id: number;
  label: string;
  content: any;
}
