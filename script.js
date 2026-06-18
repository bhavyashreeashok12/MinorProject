document.addEventListener('DOMContentLoaded',()=>{
    let open=0;
    let resolved=0;
    const delID = document.getElementById('delID');
    const cust = document.getElementById('cust');
    const issuetype = document.getElementById('issuetype');
    
    const form = document.getElementById('Myform');
    const subBtn = document.getElementById('submitBtn');
    const table = document.getElementById('Mytable');

    const filterIssue = document.getElementById('issuetype1');
    const filterStatus = document.getElementById('Status');

    function addException(){
        const ID = delID.value.trim();
        const customer = cust.value.trim();
        const issueType = issuetype.value.trim();
        const priority = document.querySelector('input[name="priority"]:checked');
        let issuePriority = '';
        if(priority){
            issuePriority = priority.value;
        }
        
        const valID = /^[a-zA-Z0-9\s-]+$/;
        const valCust = /^[a-zA-Z\s]+$/;

        if (ID.length === 0) {
            alert("Delivery ID cannot be filled with only spaces.");
            delID.value = '';
            cust.value = '';
            return;
        }

        if (ID.length>0 && !valID.test(ID)) {
            alert("Please enter a valid Delivery ID (letters, numbers, spaces, and hyphens only).");
            delID.value = '';
            cust.value = '';
            return;
        }

        if (customer.length === 0) {
            alert("Customer Name cannot be filled with only spaces.");
            cust.value = '';
            delID.value = '';
            return;
        }

        if (customer.length > 0 && !valCust.test(customer)) {
            alert("Please enter a valid Customer Name (letters and spaces only).");
            cust.value = '';
            delID.value = '';
            return;
        }

        if(ID.length > 0 && customer.length > 0 && issueType!=='' && issuePriority!==''){
            const tr = document.createElement('tr');
            open = open+1;
            document.getElementById('count1').innerText = open;
            
            const td1 = document.createElement('td');
            td1.textContent = ID;

            const td2 = document.createElement('td');
            td2.textContent = customer;

            const td3 = document.createElement('td');
            td3.className = 'issueType';
            td3.textContent = issueType;

            const td4 = document.createElement('td');
            td4.textContent = issuePriority;

            const td5 = document.createElement('td');
            td5.className = 'status';
            td5.textContent = 'Open';

            const td6 = document.createElement('td');
            const btn1 = document.createElement('button');
            btn1.className = 'actionBtn resolve-action-btn';
            btn1.textContent = 'Resolve';
            btn1.addEventListener('click',()=>resolveBtn(tr));

            const td7 = document.createElement('td');
            const btn2 = document.createElement('button');
            btn2.className = 'actionBtn delete-action-btn';
            btn2.textContent = 'Delete';
            btn2.addEventListener('click',()=>deleteBtn(tr));

            td6.appendChild(btn1);
            td7.appendChild(btn2);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            if (issuePriority === 'High') {
                tr.classList.add('highPriorityRow');
            }

            table.appendChild(tr);

            filtering();

            form.reset();
        }
    }
    
    function resolveBtn(exception){
        const status = exception.querySelector('.status');
        if (status) {
            status.textContent = 'Resolved';
            resolved = resolved+1;
            open = open-1;
            document.getElementById('count1').innerText = open;
            document.getElementById('count2').innerText = resolved;
        }

        exception.classList.add('resolvedRow');
        
        const resolveBtn = exception.querySelector('.resolve-action-btn');
        if (resolveBtn) {
            resolveBtn.disabled = true;
        }

        filtering();
    }

    function deleteBtn(exception){
        const status = exception.querySelector('.status');
        const currentStatus = status ? status.textContent.trim() : '';

        if (currentStatus === 'Open') {
            alert("Operational Error: You cannot delete an unresolved exception. Please 'Resolve' the issue first!");
            return;
        }
        let confirmation = prompt("Are you sure to DELETE this(y/n)?");
        if(confirmation==='y' || confirmation === 'Y'){
            if(currentStatus === 'Resolved'){
                resolved = resolved - 1;
                document.getElementById('count2').innerText = resolved;
            }
            table.removeChild(exception);
        }
    }

    function filtering(exception){
        const selectedIssue = filterIssue.value;
        const selectedStatus = filterStatus.value;

        for( let i=1; i<table.rows.length; i++){
            let row = table.rows[i];
            let issueCell = row.querySelector('.issueType');
            let statusCell = row.querySelector('.status');

            if (!issueCell || !statusCell) continue;

            let rowIssue = issueCell.textContent.trim();
            let rowStatus = statusCell.textContent.trim();

            let issueMatches = (selectedIssue === 'All' || rowIssue === selectedIssue);
            let statusMatches = (selectedStatus === 'All' || rowStatus === selectedStatus);

            if (issueMatches && statusMatches) {
                row.classList.remove('hidden-row');
            } else {
                row.classList.add('hidden-row');
            }
        }
    }

    filterIssue.addEventListener('change', filtering);
    filterStatus.addEventListener('change', filtering);

    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        addException();
    });

    const Dform = document.getElementById('Dform');
    const Exception = document.getElementById('Exception');

    const formhead = document.getElementById('formhead');
    const dashboardHead = document.getElementById('dashboardHead');

    if(Dform && formhead){
        Dform.addEventListener('click',()=>{
            formhead.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if(Exception && dashboardHead){
        Exception.addEventListener('click',()=>{
            dashboardHead.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});