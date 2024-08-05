export function isEmpty(variable: any): boolean {
    if (variable === null || variable === undefined || variable === '') {
      return true;
    }
    return false;
  }


export const formatDate = (value : string)=>{
    const date = new Date(value);
    const month = date.getMonth() + 1; // Add 1 because month values are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

   return(formattedDate);
}


export const parseDMY = (s:string) : Date => {
  let [d, m, y] = s.split(/\D/);
  return new Date(parseInt(y), parseInt(m)-1, parseInt(d));
};