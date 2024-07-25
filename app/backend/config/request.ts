export const sqlQuery = {
    unpaid_bills_by_contract_number :
    `select /*+ parallel(4) */
        doc_id code_regroupement,
        r.nis_rad numero_contrat,
        r.num_rec numero_facture,
        (select regexp_replace(regexp_replace(c.ape1_cli,'[\+\*\$!%,?\.;^¨§]*') || ' ' ||
        regexp_replace(c.nom_cli,'[\+\*\$!%,?\.;^¨§]*') || ' ' ||
        regexp_replace(c.ape2_cli,'[\+\*\$!%,?\.;^¨§]*'), '^[[:blank:][:space:]''\+\*\$!%,?\.;^¨§-]*|[[:blank:][:space:]''\+\*\$!%,?\./;^¨§-]*$')
        from cmsadmin.clientes c join cmsadmin.sumcon s on c.cod_cli = s.cod_cli where s.nis_rad = r.nis_rad) nom_client,
        to_char(r.f_prev_puesta,'dd/mm/yyyy') date_facturation,
        ceil(imp_tot_rec-imp_cta) montant_impaye
    from cmsadmin.recibos r left join cmsadmin.xclientes x on r.nis_rad = x.nis_rad
        join cmsadmin.sumcon s on r.nis_rad = s.nis_rad and regexp_like(s.est_serv,'EC0(1[1-4]|2[08])')
    where r.nis_rad = :ContractNber
        and r.f_prev_puesta between to_date(:FromDate, 'dd/mm/yyyy') and to_date(:ToDate, 'dd/mm/yyyy')
        and imp_tot_rec - imp_cta > 0
        and regexp_like(tip_rec, 'TR0([1-6]0|12|21|22)')
        and ((r.est_act in (select est_rec from cmsadmin.grupo_est where co_grupo = 'GE114')
                and regexp_like(s.est_serv,'EC0(1[1-4]|28)'))
            or (r.est_act = 'ER240' and s.est_serv = 'EC020'))
    order by f_prev_puesta desc`,

    unpaid_bills_by_invoice_number :
    `select /*+ parallel(6) */
        s.regroup_id code_regroupement,
        decode(r.nis_rad, 0, r.cod_cta_pago, r.nis_rad) numero_contrat,
        r.num_rec numero_facture,
        s.cust_name nom_client,
        to_char(r.f_prev_puesta,'dd/mm/yyyy') date_facturation,
        ceil(imp_tot_rec-imp_cta) montant_impaye
    from cmsadmin.recibos r
        left join cmsreport.tb_customers_infos s on r.nis_rad = s.nis_rad and regexp_like(s.est_serv,'EC0(1[1-4]|2[08])')
    where /*r.num_rec in (424378539) or*/ (r.num_rec = :BillNber
        and r.imp_tot_rec - r.imp_cta > 0
        and regexp_like(r.tip_rec, 'TR0([1-6]0|12|21|22)')
        and ((r.est_act in (select est_rec from cmsadmin.grupo_est where co_grupo = 'GE114')
                and regexp_like(s.est_serv,'EC0(1[1-4]|28)'))
            or (r.est_act = 'ER240' and s.est_serv = 'EC020')
            or r.nis_rad = 0))`

} 

