"use strict";
(function () {

    let nav_item_array = document.getElementsByClassName("nav-item");
    let add_project_id = document.getElementById("add_project_id");
    //添加科研项目
    add_project_id.addEventListener("click", function () {
        activeNavItem();
        add_project_id.setAttribute('class', 'active nav-item');
        let post_data = {};



        ajax("/requirePage/addProject", "GET", post_data, updatePage);
    });



    
    function updatePage(inner_content) {
        let old_page = inner_content;
        //share_page_content.innerHTML = inner_content;
        document.getElementById("page_content_id").innerHTML = inner_content;
        //这里面总共有四个ajax按钮， 分别是添加项目， 添加合作方， 添加委托方， 添加监管方
        //第一个添加项目
        addProjectAjax();
        addProjectPrincipal();
        addProjectSuper();
    }

 
    //负责人项目工作量初始时设置为 0
    function addProjectAjax() {
        document.getElementById("add_project_btn_id").addEventListener("click", function(){
            let post_data = {
                "principal_people_id" : document.getElementById("project_principal_id").value,
                "principal_funding":"0",
                "project_workload": "0",
                "project_name": document.getElementById("project_name_id").value,
                "research_content":document.getElementById("project_content_id").value,
                "total_funding":document.getElementById("project_funding_id").value,
                "start_time":document.getElementById("project_start_time_id").value,
                "finish_time":document.getElementById("project_finish_time_id").value
            }
            function updatePageSecond() {return ;}
            ajax("/adminAddTx/addProject", "POST", post_data, updatePageSecond);
        });
    }


    function addProjectPrincipal() {
        document.getElementById("add_principal_id").addEventListener("click", function(){
            //这一部分上jquery,每四个一个循环
            let $contract_peoples = $('#principal_contract_people_list .input-group .contract-people')
            //这一部分逻辑有问题，应该是先添加联系人，再获取到联系人id
            let contract_people_id_array = [];
            let contract_people_info_array = [];
            for(let i = 0; i < $contract_peoples.length; i++){
                if(i%4 == 0) {
                    contract_people_id_array.push($contract_peoples[i].value);
                }
            }
            console.log(contract_people_id_array);
            let post_data = {
                "type": "principal",
                "project_id": document.getElementById("principal_project_id").value,
                "company_id" : document.getElementById("principal_company_id").value,
                "contract_id_array": contract_people_id_array,
                "principal_id": document.getElementById("principal_people_id").value
            }
            function updatePageSecond() { return;}
            ajax("/adminAddTx/addProjectPrinSuperCompany","POST",post_data, updatePageSecond);
        });
        //添加联系人
        document.getElementById("add_principal_contract_id").addEventListener("click", function(){
            let contract_people_list = document.getElementById("principal_contract_people_list");
            let input_group = document.createElement("div");
            input_group.setAttribute("class", "input-group");
            input_group.innerHTML =' ' + 
            '<span class="input-group-addon" id="basic-addon1">联系人</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">移动手机</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">固定电话</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">邮箱地址</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">';
            contract_people_list.appendChild(input_group);
        });
    }


    function addProjectSuper() {
        document.getElementById("add_supervision_id").addEventListener("click", function(){
            //这一部分上jquery,每四个一个循环
            let $contract_peoples = $('#supervision_contract_people_list .input-group .contract-people')
            //这一部分逻辑有问题，应该是先添加联系人，再获取到联系人id
            let contract_people_id_array = [];
            let contract_people_info_array = [];
            for(let i = 0; i < $contract_peoples.length; i++){
                if(i%4 == 0) {
                    contract_people_id_array.push($contract_peoples[i].value);
                }
            }
            console.log(contract_people_id_array);
            let post_data = {
                "type": "supervision",
                "project_id": document.getElementById("supervision_project_id").value,
                "company_id" : document.getElementById("supervision_company_id").value,
                "contract_id_array": contract_people_id_array,
                "principal_id": document.getElementById("supervision_principal_id").value
            }
            function updatePageSecond() { return;}
            ajax("/adminAddTx/addProjectPrinSuperCompany","POST",post_data, updatePageSecond);
        });
        //添加联系人
        document.getElementById("add_supervision_contract_id").addEventListener("click", function(){
            let contract_people_list = document.getElementById("supervision_contract_people_list");
            let input_group = document.createElement("div");
            input_group.setAttribute("class", "input-group");
            input_group.innerHTML ='' + 
            '<span class="input-group-addon" id="basic-addon1">联系人</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">移动手机</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">固定电话</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">'+
            '<span class="input-group-addon" id="basic-addon1">邮箱地址</span>'+
            '<input type="number" class="form-control contract-people" placeholder="Username" aria-describedby="basic-addon1">';
            contract_people_list.appendChild(input_group);
        });
    }

    function ajax(url, method, post_data, updatePage) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 0) {
                    let responseText = xhr.responseText;
                    //这里便是响应报文
                    //console.log("ajax success");
                    alert(responseText);
                    //return responseText;
                    updatePage(responseText);
                }
            }
        }
        // let postData = {
        //   work_id: document.getElementById("workID").value,
        //   admin_name: document.getElementById("adminName").value,
        //   passwd: hex_sha256(document.getElementById("passwd").value)
        // }
        xhr.open(method, url);
        // xhr.setRequestHeader("authorization", "Bearer " + document.getElementById("userId").value);
        if (JSON.stringify(post_data) === '{}') {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(post_data));
        }

    }
    function activeNavItem() {
        for (let i = 0; i < nav_item_array.length; i++) {
            nav_item_array[i].setAttribute("class", "nav-item");
        }
    }

})()