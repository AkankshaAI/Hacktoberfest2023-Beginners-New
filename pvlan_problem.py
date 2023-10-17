########################################################################################################################
#
#TOPOLOGY :
# 				  ____________ 
#  				 |            |
# 				 |            |
#                |            |
#   Ixia --------| N3K Box    |----------- Ixia
#   		     |            | 
#  				 |            |      
# 				 |____________|
#                              
#                                                                                                  
#topology requirement :-   1 N3k box 
#                          2 Ixia Connections
#    					   
########################################################################################################################
from ats import tcl
from ats import aetest
from ats.log.utils import banner

from unicon.eal.dialogs import Dialog
from unicon.eal.dialogs import Statement

import time
import logging
import os
import sys
import re
import pdb
import json
import pprint
import socket
import struct
import inspect
import yaml
import random
import pvlan_issu_lib as l2ptLib

from yaml import loader
from pyats.aetest.steps import Steps

sys.path.append('/ws/aputpat-bgl/IXIA_9.10/IXIA_9.10/lib/PythonApi')
sys.path.append('/ws/aputpat-bgl/IXIA_9.10/IXIA_9.10/lib/hltapi/library/common/ixiangpf/python')

from ixiatcl import IxiaTcl
from ixiahlt import IxiaHlt
from ixiangpf import IxiaNgpf
from ixiaerror import IxiaError
    
global ixia_chassis_ip, ixia_tcl_server, ixia_ixnetwork_tcl_server,ixia_username, ixia_reset_flag

global custom
global device1

global uut1
global ixia_uut1_1 , ixia_uut1_2
global uut1_ixia_intf1 , uut1_ixia_intf2
global data_stream_ids
global traffic_stream_id_1
   
log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
   
class ForkedPdb(pdb.Pdb):
    '''A Pdb subclass that may be used
    from a forked multiprocessing child1
    '''
    def interaction(self, *args, **kwargs):
        _stdin = sys.stdin
        try:
            sys.stdin = open('/dev/stdin')
            pdb.Pdb.interaction(self, *args, **kwargs)
        finally:
            sys.stdin = _stdin
################################################################################
####                       COMMON SETUP SECTION                             ####
################################################################################
class common_setup(aetest.CommonSetup):
    
    @aetest.subsection
    def connect_to_devices(self,testscript,testbed,R1):
    
        global ixia_uut1_1 , ixia_uut1_2
        global uut1_ixia_intf1 , uut1_ixia_intf2
        global ixia_chassis_ip, ixia_tcl_server, ixia_ixnetwork_tcl_server,ixia_username, ixia_reset_flag
        
        global uut1 , tgen
        
        uut1=testbed.devices[R1]
        testscript.parameters['uut1'] = uut1
        
        tgen = testbed.devices['ixia']
        testscript.parameters['tgen'] = tgen
        
        tgen_attributes = tgen.connections.hltapi
        ixia_chassis_ip = str(tgen_attributes.ip)
        ixia_tcl_server = tgen_attributes.tcl_server
        ixia_ixnetwork_tcl_server = tgen_attributes.ixnetwork_tcl_server
        ixia_username = tgen_attributes.username
        ixia_reset_flag = tgen_attributes.reset
        
        #### Ixia Interfaces ################
        ixia_uut1_1 = testbed.devices['ixia'].interfaces['ixia_uut1_1']
        ixia_uut1_2 = testbed.devices['ixia'].interfaces['ixia_uut1_2']
        
        testscript.parameters['ixia_uut1_1'] = ixia_uut1_1
        testscript.parameters['ixia_uut1_2'] = ixia_uut1_2
        
        testscript.parameters['ixia_uut1_1'].name = testscript.parameters['ixia_uut1_1'].intf
        testscript.parameters['ixia_uut1_2'].name = testscript.parameters['ixia_uut1_2'].intf
        
        ixia_uut1_1 = ixia_uut1_1.intf
        ixia_uut1_2 = ixia_uut1_2.intf
        
        #### uut1 Interfaces ################
        uut1_ixia_intf1 = testbed.devices[R1].interfaces['uut1_ixia_intf1']
        testscript.parameters['uut1_ixia_intf1'] = uut1_ixia_intf1     
        testscript.parameters['uut1_ixia_intf1'].name = testscript.parameters['uut1_ixia_intf1'].intf
        
        uut1_ixia_intf2 = testbed.devices[R1].interfaces['uut1_ixia_intf2']
        testscript.parameters['uut1_ixia_intf2'] = uut1_ixia_intf2     
        testscript.parameters['uut1_ixia_intf2'].name = testscript.parameters['uut1_ixia_intf2'].intf
        
        uut1_ixia_intf1=uut1_ixia_intf1.intf
        uut1_ixia_intf2=uut1_ixia_intf2.intf
        
        log.info("Connecting to Device...")
        log.info("%s"%uut1.name)
        try:
            uut1.connect()
            log.info("Connection to %s Successful..."%uut1.name)
        except Exception as e:
            log.info("Connection to %s Unsuccessful "\
                      "Exiting error:%s"%(uut1.name,e))
            self.failed(goto=['exit'])
    @aetest.subsection
    def module_n_version(self,testscript,testbed):
        uut1.execute("show version")
        uut1.execute("show mod")
        time.sleep(5)
    @aetest.subsection
    def creating_Primary_Isolated_Community(self,testbed,testscript):
        uut1.configure("feature private-vlan")
        log.info(banner("CREATING  primary ,isolated ,community VLANs"))
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
        l2ptLib.private_vlan(pri,iso,com,uut1)
        time.sleep(3)
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        l2ptLib.private_vlan(pri1,iso1,com1,uut1)
        time.sleep(3)
        
    @aetest.subsection    
    def configue_interface(self, testscript, testbed):
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
    
        cmd = f"""interface {uut1_ixia_intf1}
               switchport
               switchport mode private-vlan host
               switchport private-vlan host-association {pri} {com}
               no shut"""
        uut1.configure(cmd)
        
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        
        cmd = f"""interface {uut1_ixia_intf2}
               switchport
               switchport mode private-vlan host
               switchport private-vlan host-association {pri1} {com1}
               no shut"""
        uut1.configure(cmd)
        
        uut1.execute("""sh running-config int %s"""%uut1_ixia_intf2)
        
    @aetest.subsection
    def connect_to_ixia(self, testscript, testbed):
        """Connect Ixia and get port handles"""
        ixia_port_list = [ixia_uut1_1, ixia_uut1_2]
        global ixia_
        global ixia_port_1_handle,ixia_port_2_handle
        
        status,port_handle = l2ptLib.connect_ixia(ixia_chassis_ip, ixia_tcl_server, ixia_ixnetwork_tcl_server, \
                                                        ixia_port_list, ixia_reset_flag, ixia_username)
        if status != True:
            log.error("\nFail to Connect Ixia!!")
            self.failed(goto=['exit'])
        else:
            ixia_port_1_handle = port_handle.split(' ')[0]
            ixia_port_2_handle = port_handle.split(' ')[1]
            log.info("\nixia_port_1_handle = {}".format(ixia_port_1_handle))
            log.info("\nixia_port_2_handle = {}".format(ixia_port_2_handle))
            self.passed("Connected Ixia and got port handles!!")
           
        ##############################################################
        # config the parameters for IXIA stream                      #
        ##############################################################
    
    @aetest.subsection
    def configure_ixia_interfaces(self,testscript,testbed):
        """Configure IPs to ixia interfaces"""
        global protocol_intf_handle_9,protocol_intf_handle_20,protocol_intf_handle_30,protocol_intf_handle_40
        global mac1, mac2 , MAC1, MAC2
        
        intf_handle_list = []
        ixia_port_list = [ixia_port_1_handle, ixia_port_2_handle]
        
            #ForkedPdb().set_trace()
        mac1 = "00:00:00:A8:B5:C7"
        colons = mac1.replace(":", "")
        lowercase = colons.lower()
        MAC1 = lowercase[:4] + "." + lowercase[4:8] + "." + lowercase[8:]
        testscript.parameters['MAC1'] = MAC1
    
        status,interface_handle = l2ptLib.config_ixia_L2_interfaces(ixia_port_1_handle,mac1) #search       
        if status != True:
                log.error("\n Fail to configure mac address to port 1")
                self.failed(goto=['exit'])
        else:
                intf_handle_list.append(interface_handle)
                log.info("\nSuccessfully configured mac address to port 1")
                
        mac2 = "00:00:00:D8:E5:F7"
        colons = mac2.replace(":", "")
        lowercase = colons.lower()
        MAC2 = lowercase[:4] + "." + lowercase[4:8] + "." + lowercase[8:]
        testscript.parameters['MAC2'] = MAC2
        
        status,interface_handle = l2ptLib.config_ixia_L2_interfaces(ixia_port_2_handle,mac2)        
        if status != True:
                log.error("\n Fail to configure mac address to port 1")
                self.failed(goto=['exit'])
        else:
                intf_handle_list.append(interface_handle)
                log.info("\nSuccessfully configured mac address to port 1")          

        protocol_intf_handle_9 = intf_handle_list[0]
        protocol_intf_handle_20 = intf_handle_list[1]
    
        log.info("\n\nConfigured interface handles:")
        log.info("protocol_intf_handle_9: {}".format(protocol_intf_handle_9))
        log.info("protocol_intf_handle_20: {}".format(protocol_intf_handle_20))

        self.passed("IP configuration  to ixia interfaces Successful!!")    
    
    @aetest.subsection
    def configure_ixia_traffic_streams(self,testscript,testbed):
        """Configure regular traffic streams on ixia ports"""

        global traffic_stream_id_1, traffic_stream_id_2
        stream_handle_list = []
       
        intf_handle_list = [protocol_intf_handle_9, protocol_intf_handle_20]
        

        #####traffic stream Isolated to trunk secondary via trunk promiscous port ##########
        status,stream_handle = l2ptLib.config_traffic_stream1(protocol_intf_handle_9,protocol_intf_handle_20,'Unkown-unicast-community1','1000','ethernet_vlan')
        
        if status != True:
            log.error("\n Fail to create first traffic stream")
            self.failed(goto=['exit'])
        else:
            stream_handle_list.append(stream_handle)
            log.info("\nSuccessfully created 1st traffic stream")
            
        status,stream_handle = l2ptLib.config_traffic_stream1(protocol_intf_handle_20,protocol_intf_handle_9,'Unkown-unicast-community2','1000','ethernet_vlan')
        
        if status != True:
            log.error("\n Fail to create second traffic stream")
            self.failed(goto=['exit'])
        else:
            stream_handle_list.append(stream_handle)
            log.info("\nSuccessfully created 2nd traffic stream")

        traffic_stream_id_1 = stream_handle_list[0]
        traffic_stream_id_2 = stream_handle_list[1]
        
        log.info("traffic_stream_id_1: {}".format(traffic_stream_id_1))
        log.info("traffic_stream_id_2: {}".format(traffic_stream_id_2))
        log.info("Regular Ixia streams are configured Successfully!!")
        
    @aetest.subsection
    def start_traffic(self,testbed,testscript):
        global data_stream_ids
       
        
        data_stream_ids = [traffic_stream_id_1, traffic_stream_id_2]
        # ForkedPdb().set_trace()
        l2ptLib.run_traffic_stream1(traffic_stream_id_1)
        # ForkedPdb().set_trace()
        l2ptLib.run_traffic_stream1(traffic_stream_id_2)
        time.sleep(30)
        log.info("traffic started successfully")
################################################################################
###                          TESTCASE BLOCK                                  ###
################################################################################        
class CSCwf75511_tests(aetest.Testcase):
    @aetest.test
    def before_reload_pvlan_checks(self,testbed,testscript):
        out=uut1.execute("sh vlan private-vlan")
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
        
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        
        pattern2 = fr"{pri}\s*{com}\s*[Cc]ommunity\s*{uut1_ixia_intf1}"
        if re.findall(pattern2, out):
            pattern1 = fr"{pri}\s*{iso}\s*[Ii]solated"
            if re.findall(pattern1, out):
                pattern3 = fr"{pri1}\s*{com1}\s*[Cc]ommunity\s*{uut1_ixia_intf2}"
                if re.findall(pattern3, out):
                    pattern4 = fr"{pri1}\s*{iso1}\s*[Ii]solated"
                    if re.findall(pattern4, out):
                        iso1 = True
                    else:
                        iso0 = True
                else:
                    com0 = True
            else:
                iso00 = True
        else:
            com00 = True
        if iso1:
            log.info("PASSED : pairs are present before reload")
        elif iso0:
            log.error("FAILED : pair not present before reload")
        elif com0:
            log.error("FAILED : pair not present before reload")
        elif iso00:
            log.error("FAILED : pair not present before reload")
        elif com00:
            log.error("FAILED : pair not present before reload")
            
    @aetest.test
    def before_reload_mac_checks(self,testbed,testscript):        
        output = uut1.execute("sh mac address-table dynamic")
        # ForkedPdb().set_trace()
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
        
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        
        count = 0
        mount = 0
        match = r"VLAN.*Ports"
        #match = r"VLAN\s*\s*agMAC\s*Address\s*Typee\s*Secure\s*NTFY\s*Ports"
        check = re.findall(match, output)[0]
        start_index = output.find(check)
        end_index = len(output)
        extracted_output = output[start_index:end_index]
        lines = extracted_output.split('\n')
        entry = []
        for line in lines:
            l = line.strip()
            entry.append(l)
        if len(entry) != 0:      
            for ent in entry:
                if pri in ent and MAC1 in ent and uut1_ixia_intf1 in ent:
                    count += 1
            for ent in entry:
                if pri1 in ent and MAC2 in ent and uut1_ixia_intf2 in ent:
                    mount += 1        
            if count == 1:
                log.info(f"PASSED : mac-address of {uut1_ixia_intf1} is present before reload")
                if mount == 1:
                    log.info(f"PASSED : mac-address of {uut1_ixia_intf2} is present before reload")
                else:
                    log.error("FAILED : mac address is not present before reload")
                    self.failed()
            else:
                log.error("FAILED : mac address is not present before reload")
                self.failed()
        else:
            log.error("Something went wrong")
            self.failed()
                
    @aetest.test
    def reload(self,testbed,testscript ):
        log.info(banner(f"Reloading {uut1} device"))
        l2ptLib.reload(uut1)
    
    @aetest.test
    def after_reload_pvlan_checks(self,testbed,testscript):
        out=uut1.execute("sh vlan private-vlan")
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
        
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        
        pattern2 = fr"{pri}\s*{com}\s*[Cc]ommunity\s*{uut1_ixia_intf1}"
        if re.findall(pattern2, out):
            pattern1 = fr"{pri}\s*{iso}\s*[Ii]solated"
            if re.findall(pattern1, out):
                pattern3 = fr"{pri1}\s*{com1}\s*[Cc]ommunity\s*{uut1_ixia_intf2}"
                if re.findall(pattern3, out):
                    pattern4 = fr"{pri1}\s*{iso1}\s*[Ii]solated"
                    if re.findall(pattern4, out):
                        Iso1 = True
                    else:
                        Iso0 = True
                else:
                    Com0 = True
            else:
                Iso00 = True
        else:
            Com00 = True
        if Iso1:
            log.info("PASSED : pairs are present after reload")
        elif Iso0:
            log.error("FAILED : pair not present after reload")
        elif Com0:
            log.error("FAILED : pair not present after reload")
        elif Iso00:
            log.error("FAILED : pair not present after reload")
        elif Com00:
            log.error("FAILED : pair not present after reload")
                
    @aetest.test
    def after_reload_mac_checks(self,testbed,testscript):
        output = uut1.execute("sh mac address-table dynamic")
        pri = testbed.custom['primary']
        iso = testbed.custom['isolated']
        com = testbed.custom['community']
        
        pri1 = testbed.custom['Primary1']
        iso1 = testbed.custom['Isolated1']
        com1 = testbed.custom['Community1']
        
        count = 0
        mount = 0
        match = r"VLAN.*Ports"
        #match = r"VLAN\s*\s*agMAC\s*Address\s*Typee\s*Secure\s*NTFY\s*Ports"
        check = re.findall(match, output)[0]
        start_index = output.find(check)
        end_index = len(output)
        extracted_output = output[start_index:end_index]
        lines = extracted_output.split('\n')
        entry = []
        for line in lines:
            l = line.strip()
            entry.append(l)
        if len(entry) != 0:      
            for ent in entry:
                if pri in ent and MAC1 in ent and uut1_ixia_intf1 in ent:
                    count += 1
            for ent in entry:
                if pri1 in ent and MAC2 in ent and uut1_ixia_intf2 in ent:
                    mount += 1        
            if count == 1:
                log.info(f"PASSED : mac-address of {uut1_ixia_intf1} is present after reload")
                if mount == 1:
                    log.info(f"PASSED : mac-address of {uut1_ixia_intf2} is present after reload")
                else:
                    log.error("FAILED : mac address is not present after reload")
                    self.failed()
            else:
                log.error("FAILED : mac address is not present after reload")
                self.failed()
        else:
            log.error("Something went wrong")
            self.failed()        
################################################################################
####                       COMMON CLEANUP SECTION                           ####
################################################################################
class common_cleanup(aetest.CommonCleanup):
    @aetest.subsection
    def removing_all_configurations(self,testbed,testscript):
        log.info(banner("REMOVING THE CONFIGURED VLANs"))
        uut1.configure(f"default int {uut1_ixia_intf1}",timeout=600)
        uut1.configure(f"default int {uut1_ixia_intf2}",timeout=600)
        uut1.configure(""" no feature private-vlan\n feature private-vlan""")
        uut1.disconnect()
        log.info(banner("Successfully disconnecting from the device."))        
